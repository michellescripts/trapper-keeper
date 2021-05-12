import React, {useEffect, useState} from 'react'
import {useNoteApi} from '../api/NoteApiContext'
import {Note} from './Note'
import {NoteCard} from './NoteCard'
import {useNotesStyles} from './Notes.styles'

export const Notes = () => {
    const noteApi = useNoteApi()
    const [notes, setNotes] = useState<Note[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const notesStyles = useNotesStyles()

    useEffect(() => {
        noteApi.getNotes()
            .then(getNotesResponse => {setNotes(getNotesResponse.notes)})
            .catch(() => setError('Get notes failed due to api error'))
            .finally(() => setLoading(false))
    }, [noteApi])

    const createNote = (note: Note, i: number): React.ReactNode => {
        return <NoteCard
            key={i}
            note={note}
        />
    }

    return <div>
        {loading && <div data-testid={'loading-indicator'}>Loading</div>}
        {error !== undefined && <div data-testid={'error'}>{error}</div>}

        {(!error && !loading && notes.length > 0) && <div data-testid={'notes'} className={notesStyles.notes}>
            {notes.map(createNote)}
        </div>}
    </div>
}
