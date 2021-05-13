import {makeNoteResponse} from '../makers/makeNoteResponse'
import {makeNote} from '../makers/makeNote'
import {mockNoteApiWith} from '../testHelpers/spies/mockNoteApiWith'
import {makeNoteApi} from '../makers/makeNoteApi'
import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {Trash} from './Trash'

describe('Trash', () => {
    it('displays the notes', async () => {
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
            getNotesDeleted: () => notePromise,
        }))

        const subject = render(<Trash/>)

        expect(screen.queryByTestId('loading-indicator')).toBeTruthy()
        expect(screen.queryByTestId('notes')).toBeFalsy()

        await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeFalsy())
        expect(screen.getByTestId('notes')).toBeTruthy()
        expect(subject.getByText('some-title')).toBeTruthy()
        expect(subject.getByText('some-other-title')).toBeTruthy()
    })
})
