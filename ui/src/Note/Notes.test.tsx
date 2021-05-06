import React from 'react'
import {Notes} from './Notes'
import {makeNoteApi} from '../Makers/makeNoteApi'
import {makeNoteResponse} from '../Makers/makeNoteResponse'
import {makeNote} from '../Makers/makeNote'
import {render, screen, waitFor} from '@testing-library/react'
import {mockNoteApiWith} from '../testHelpers/spies/mockNoteApiWith'

describe('Notes', () => {
    it('displays the note data', async () => {
        const notePromise = Promise.resolve(makeNoteResponse({
            notes: [
                makeNote({
                    title: 'some-title',
                }),
                makeNote({
                    title: 'some-other-title',
                }),
            ],
        }))

        mockNoteApiWith(makeNoteApi({
            getNotes: () => notePromise,
        }))

        const subject = render(<Notes/>)

        expect(screen.queryByTestId('loading-indicator')).toBeTruthy()
        expect(screen.queryByTestId('notes')).toBeFalsy()

        await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeFalsy())
        expect(screen.getByTestId('notes')).toBeTruthy()
        expect(subject.getByText('some-title')).toBeTruthy()
        expect(subject.getByText('some-other-title')).toBeTruthy()
    })
})
