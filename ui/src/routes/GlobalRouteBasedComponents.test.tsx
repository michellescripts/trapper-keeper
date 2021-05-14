import React from 'react'
import {GlobalRouteBasedComponents} from './GlobalRouteBasedComponents'
import {BrowserRouter as Router} from 'react-router-dom'
import {render, waitFor} from '@testing-library/react'
import {NoteApiProvider} from '../api/NoteApiContext'

describe('GlobalRouteBasedComponents', () => {
    interface TestCase {
        route: string;
        shouldRenderNav: boolean;
    }

    const testCases: TestCase[] = [
        {
            route: '/',
            shouldRenderNav: true,
        },
        {
            route: '/trash',
            shouldRenderNav: true,
        },
        {
            route: '/bogus',
            shouldRenderNav: false,
        },
    ]

    describe('nav bar', () => {
        testCases.forEach(testCase => {
            if (testCase.shouldRenderNav) {
                it(`should be visible on the route "${testCase.route}"`, async () => {
                    // hides down-the-chain data-loader errors when rendering
                    const spy = jest.spyOn(global.console, 'error').mockImplementation(jest.fn())

                    const subject = render(
                        <NoteApiProvider>
                            <Router>
                                <GlobalRouteBasedComponents route={testCase.route}/>
                            </Router>
                        </NoteApiProvider>
                    )
                    await waitFor(() => expect(subject.getByTestId('navigation')).toBeTruthy())
                    await waitFor(() => expect(console.error).toBeCalled())

                    spy.mockRestore()
                })
            } else {
                it(`should not be visible on the route "${testCase.route}"`, () => {
                    const subject = render(
                        <NoteApiProvider>
                            <Router>
                                <GlobalRouteBasedComponents route={testCase.route}/>
                            </Router>
                        </NoteApiProvider>
                    )
                    expect(subject.queryByTestId('navigation')).toBeFalsy()
                })
            }
        })
    })

    describe('Route not found', () => {
        it('should render a not found component', () => {
            const subject = render(
                <NoteApiProvider>
                    <Router>
                        <GlobalRouteBasedComponents route="/bogus"/>
                    </Router>
                </NoteApiProvider>
            )
            expect(subject.getByTestId('not-found')).toBeTruthy()
        })
    })
})
