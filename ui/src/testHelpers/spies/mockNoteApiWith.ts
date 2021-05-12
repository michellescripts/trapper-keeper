import {NoteApi} from '../../api/NoteApi'
import * as NoteApiContext from '../../api/NoteApiContext'

export const mockNoteApiWith = (client: NoteApi): jest.SpyInstance => {
    const hookSpy = jest.spyOn(NoteApiContext, 'useNoteApi')
    hookSpy.mockReturnValue(client)
    return hookSpy
}
