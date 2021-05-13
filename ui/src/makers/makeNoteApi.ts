import {NoteApi} from '../api/NoteApi'
import {Made} from './Made'

export const makeNoteApi = (overrides: Partial<NoteApi> = {}): Made<NoteApi> => {
    return Object.assign({
        getNotes: jest.fn(),
        getNotesDeleted: jest.fn(),
    }, overrides)
}
