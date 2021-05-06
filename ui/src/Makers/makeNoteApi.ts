import {NoteApi} from '../API/NoteApi'
import {Made} from './Made'

export const makeNoteApi = (overrides: Partial<NoteApi> = {}): Made<NoteApi> => {
    return Object.assign({
        getNotes: () => new Promise(() => {}),
    }, overrides)
}
