import {Made} from './Made'
import {NoteResponse} from '../api/NoteResponse'
import {makeNote} from './makeNote'

export const makeNoteResponse = (overrides: Partial<NoteResponse> = {}): Made<NoteResponse> => {
    return Object.assign({
        notes: [makeNote()],
    }, overrides)
}
