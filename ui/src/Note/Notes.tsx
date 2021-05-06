import React, {useEffect, useState} from 'react'
import {useNoteApi} from '../API/NoteApiContext'
import {Note} from './Note'

export const Notes = () => {
    const noteApi = useNoteApi()
    const [notes, setNotes] = useState<Note[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        noteApi.getNotes()
            .then(getNotesResponse => {setNotes(getNotesResponse.notes)})
            .catch(() => setError('Get notes failed due to api error'))
            .finally(() => setLoading(false))
    }, [noteApi])

    const createNote = (note: Note, i: number): React.ReactNode => {
        return <div key={i}>
            {note.title}
        </div>
    }

    return <div>
        {loading && <div data-testid={'loading-indicator'}>Loading</div>}
        {error !== undefined && <div data-testid={'error'}>{error}</div>}

        {(!error && !loading && notes.length > 0) && <pre data-testid={'notes'}>
            {notes.map(createNote)}
        </pre>}
    </div>
}
