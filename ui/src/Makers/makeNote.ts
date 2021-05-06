import {Note, NoteType} from '../Note/Note'
import {Made} from './Made'

export const makeNote = (overrides: Partial<Note> = {}): Made<Note> => {
    return Object.assign({
        id: '',
        title: '',
        data: 'String',
        type: NoteType.BLOB,
        pinned: false,
    }, overrides)
}
