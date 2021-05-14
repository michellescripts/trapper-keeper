/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import {DataLoader} from './DataLoader'
import {mockNoteApiWith} from '../testHelpers/spies/mockNoteApiWith'
import {makeNoteApi} from '../makers/makeNoteApi'
import {render, screen, waitFor} from '@testing-library/react'
import {NoteApi} from './NoteApi'
import {NoteResponse} from './NoteResponse'
import userEvent from '@testing-library/user-event'

interface ChildProps {
    childProp: string;
}

describe('DataLoader', () => {
    beforeEach(() => {
        mockNoteApiWith(makeNoteApi())
    })

    it('provides data', async () => {
        const TestComponent: React.FC<ChildProps> = props => <div>
            <span id="childProp">{props.childProp}</span>
        </div>

        const dataPromise: Promise<ChildProps> = Promise.resolve({childProp: 'the data!'})
        render(<DataLoader<ChildProps>
            dataSource={(): Promise<ChildProps> => dataPromise}
            render={(childProps: ChildProps): React.ReactNode => <TestComponent {...childProps}/>}
        />)

        expect(screen.getByTestId('loading')).toBeInTheDocument()
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
        expect(screen.getByText('the data!')).toBeInTheDocument()
    })

    it('provides the Note API to the data source', async () => {
        const mockNotes: NoteResponse = {notes: []}
        const mockApi = makeNoteApi()
        mockNoteApiWith(mockApi)
        mockApi.getNotes.mockReturnValue(Promise.resolve(mockNotes))

        const TestComponent: React.FC<{ notes: NoteResponse }> = props => <div
            data-length={props.notes.notes.length}
        />

        let promiseGetter: () => Promise<unknown> = () => {
            throw('This should be the data source promise instead.')
        }

        render(
            <DataLoader<{ notes: NoteResponse }>
                dataSource={(noteApi: NoteApi) => {
                    const promise = noteApi.getNotes().then((notes: NoteResponse) => ({
                        notes: notes,
                    }))
                    promiseGetter = () => promise
                    return promise
                }}
                render={props => <TestComponent {...props} />}/>,
        )

        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
    })

    it('resets loading state if props change', async () => {
        const TestComponent: React.FC<ChildProps> = props => <div>
            <span id="childProp">{props.childProp}</span>
        </div>

        const dataPromise: Promise<ChildProps> = Promise.resolve({childProp: 'Old data!'})
        const {rerender} = render(<DataLoader<ChildProps>
            dataSource={(): Promise<ChildProps> => dataPromise}
            render={(childProps: ChildProps): React.ReactNode => <TestComponent {...childProps}/>}
        />)

        expect(screen.getByTestId('loading')).toBeInTheDocument()
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())

        const dataPromise2: Promise<ChildProps> = Promise.resolve({childProp: 'New data!'})
        rerender(<DataLoader<ChildProps>
            dataSource={(): Promise<ChildProps> => dataPromise2}
            render={(childProps: ChildProps): React.ReactNode => <TestComponent {...childProps}/>}
        />)

        expect(screen.getByTestId('loading')).toBeInTheDocument()
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
    })

    it('provides a reload callback to the child', async () => {
        let dataSourceCalls = 0
        const TestComponent: React.FC<{ data: string; reload: () => void }> = props => <div>
            <span id="data">{props.data}</span>
            <input id="reload" type="button" value="Reload" onClick={props.reload}/>
        </div>
        const dataPromise: Promise<string> = Promise.resolve('The element is present')

        const dataSource = (): Promise<string> => {
            dataSourceCalls++
            return dataPromise
        }

        const subject = render(
            <DataLoader
                dataSource={dataSource}
                render={(str, reload) => <TestComponent data={str} reload={reload}/>}/>,
        )

        expect(screen.getByTestId('loading')).toBeInTheDocument()
        expect(dataSourceCalls).toEqual(1)
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())

        userEvent.click(subject.getByText('Reload'))

        expect(screen.getByTestId('loading')).toBeInTheDocument()
        expect(dataSourceCalls).toEqual(2)
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
    })

    describe('error & errorRender', () => {
        // hides intentionally thrown errors when running tests
        let spy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>

        beforeEach(() => {
            spy = jest.spyOn(global.console, 'error').mockImplementation(jest.fn())
        })

        afterEach(() => {
            spy.mockRestore()
        })

        it('renders the errorRender component if the data source throws an error', async () => {
            const successText = 'Unexpected success!'
            const error = {error: 'some-error'}
            const dataPromise: Promise<{}> = Promise.reject(error)
            const SuccessComponent: React.FC = () => <div>{successText}</div>
            const FailureComponent: React.FC<{ data: unknown }> = (props) => <div>{JSON.stringify(props.data)}</div>

            render(<DataLoader
                dataSource={() => dataPromise}
                render={() => <SuccessComponent/>}
                errorRender={(data) => <FailureComponent data={data}/>}
            />)

            expect(screen.getByTestId('loading')).toBeInTheDocument()
            await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
            expect(screen.queryByText(JSON.stringify(error))).toBeInTheDocument()
            expect(screen.queryByText(successText)).toBeFalsy()
            await waitFor(() => expect(console.error).toBeCalledWith('Error in DataLoader:', {'error': 'some-error'}))
        })

        it('does not catch the error if there is no errorRender property', async () => {
            const successText = 'Unexpected success!'
            const error = {error: 'some-other-error'}
            const dataPromise: Promise<{}> = Promise.reject(error)

            render(<DataLoader
                dataSource={() => dataPromise}
                render={() => <div>{successText}</div>}
            />)

            expect(screen.getByTestId('loading')).toBeInTheDocument()
            expect(screen.queryByText(JSON.stringify(error))).toBeFalsy()
            expect(screen.queryByText(successText)).toBeFalsy()
            await waitFor(() => expect(console.error).toBeCalledWith('Error in DataLoader:', {'error': 'some-other-error'}))
        })

        it('provides a reload callback to the error component', async () => {
            const successText = 'The component was successfully rendered.'
            let dataSourceFailed = false

            const SuccessComponent: React.FC = () => <div>{successText}</div>

            const ErrorComponent: React.FC<{ reload: () => void }> = props => <div>
                <input id="reload" type="button" value="Reload" onClick={props.reload}/>
            </div>

            const failurePromise: Promise<string> = Promise.reject('failed')
            const successPromise: Promise<string> = Promise.resolve('success')

            const dataSource = (): Promise<string> => {
                if (!dataSourceFailed) {
                    dataSourceFailed = true
                    return failurePromise
                } else {
                    return successPromise
                }
            }

            const subject = render(
                <DataLoader
                    dataSource={dataSource}
                    render={() => <SuccessComponent/>}
                    errorRender={(undefined, reload) => <ErrorComponent reload={reload}/>}/>,
            )

            expect(screen.getByTestId('loading')).toBeInTheDocument()
            await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())

            expect(subject.getByText('Reload')).toBeInTheDocument()
            expect(subject.queryByText(successText)).toBeFalsy()
            expect(dataSourceFailed).toBeTruthy()

            userEvent.click(subject.getByText('Reload'))

            expect(screen.getByTestId('loading')).toBeInTheDocument()
            await waitFor(() => expect(screen.queryByTestId('loading')).toBeFalsy())
            expect(subject.queryByText('Reload')).toBeFalsy()
            expect(subject.getByText(successText)).toBeInTheDocument()
            expect(dataSourceFailed).toBeTruthy()
            await waitFor(() => expect(console.error).toBeCalledWith('Error in DataLoader:', 'failed'))
        })
    })
})
