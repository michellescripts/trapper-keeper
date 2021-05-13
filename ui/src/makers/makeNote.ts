import {Note, NoteType} from '../note/Note'
import {Made} from './Made'

export const makeNote = (overrides: Partial<Note> = {}): Made<Note> => {
    return Object.assign({
        id: '',
        title: '',
        data: 'String',
        type: NoteType.BLOB,
        pinned: false,
        deleted: false,
    }, overrides)
}
