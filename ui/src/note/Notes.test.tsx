import React from 'react'
import {Notes, NotesProps} from './Notes'
import {makeNote} from '../makers/makeNote'
import {render, screen} from '@testing-library/react'

describe('Notes', () => {
    let props: NotesProps

    beforeEach(() => {
        props = {notes: []}
    })

    it('displays the note data', async () => {
        props.notes = [
            makeNote({
                title: 'some-title',
            }),
            makeNote({
                title: 'some-other-title',
            }),
        ]

        const subject = render(<Notes {...props}/>)

        expect(screen.getByTestId('notes')).toBeTruthy()
        expect(subject.getByText('some-title')).toBeTruthy()
        expect(subject.getByText('some-other-title')).toBeTruthy()
    })
})
