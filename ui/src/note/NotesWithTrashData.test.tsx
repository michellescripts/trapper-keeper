import * as React from 'react'
import {makeNoteApi} from '../makers/makeNoteApi'
import {DataLoader} from '../api/DataLoader'
import {shallow} from 'enzyme'
import {NoteResponse} from '../api/NoteResponse'
import {makeNote} from '../makers/makeNote'
import {Notes} from './Notes'
import {NotesWithTrashData} from './NotesWithTrashData'

// NOTE: this test utilizes enzyme, in order to test the component props/methods
describe('NotesWithTrashData', () => {
    it('fetches notes', () => {
        const mockApi = makeNoteApi({
            getNotesDeleted: jest.fn(),
        })

        const subject = shallow(<NotesWithTrashData/>)
        expect(mockApi.getNotesDeleted).not.toHaveBeenCalled()


        subject.find(DataLoader).prop('dataSource')(mockApi)
        expect(mockApi.getNotesDeleted).toHaveBeenCalled()

    })

    it('renders Notes', () => {
        const subject = shallow(<NotesWithTrashData/>)
        const response: NoteResponse = {notes: [makeNote()]}

        const rendered = subject.find(DataLoader).renderProp('render')(
            response,
            () => {},
        )

        const assessment = rendered.find(Notes)
        expect(assessment.exists()).toEqual(true)
    })
})
