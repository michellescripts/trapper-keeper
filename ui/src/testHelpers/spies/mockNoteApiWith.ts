import {NoteApi} from '../../API/NoteApi'
import * as NoteApiContext from '../../API/NoteApiContext'

export const mockNoteApiWith = (client: NoteApi): jest.SpyInstance => {
    const hookSpy = jest.spyOn(NoteApiContext, 'useNoteApi')
    hookSpy.mockReturnValue(client)
    return hookSpy
}
