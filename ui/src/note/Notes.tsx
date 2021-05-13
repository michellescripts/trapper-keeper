import React from 'react'
import {Note} from './Note'
import {NoteCard} from './NoteCard'
import {useNotesStyles} from './Notes.styles'

export interface NotesProps {
    notes: Note[] | undefined
}

export const Notes: React.FC<NotesProps> = (props) => {
    const notesStyles = useNotesStyles()

    const createNote = (note: Note, i: number): React.ReactNode => {
        return <NoteCard
            key={i}
            note={note}
        />
    }

    return <div>
        <div data-testid={'notes'} className={notesStyles.notes}>
            {props.notes && props.notes.map(createNote)}
        </div>
    </div>
}
