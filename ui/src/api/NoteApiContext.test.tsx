import {render} from '@testing-library/react'
import {NoteApiProvider, useNoteApi} from './NoteApiContext'
import React from 'react'

describe('NoteApiContext', () => {
    test('provides the client to children of the provider', () => {
        let apiClient = undefined

        const SomeChild = () => {
            apiClient = useNoteApi()
            return <div/>
        }

        render(
            <NoteApiProvider>
                <SomeChild/>
            </NoteApiProvider>
        )

        expect(apiClient).not.toBeUndefined()
    })

    describe('failure', () => {
        // hides intentionally thrown errors when running tests
        beforeEach(() => {
            jest.spyOn(console, 'error')
            // @ts-ignore
            global.console.error.mockImplementation(() => {})
        })

        afterEach(() => {
            // @ts-ignore
            global.console.error.mockRestore()
        })

        test('useNoteApi throws if not wrapped in a provider', () => {
            const SomeChild = () => {
                useNoteApi()
                return <div/>
            }

            expect(() => render(<SomeChild/>)).toThrow()
        })
    })
})
