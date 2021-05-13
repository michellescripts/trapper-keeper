import * as React from 'react'
import {makeNoteApi} from '../makers/makeNoteApi'
import {DataLoader} from '../api/DataLoader'
import {NotesWithData} from './NotesWithData'
import {shallow} from 'enzyme'
import {NoteResponse} from '../api/NoteResponse'
import {makeNote} from '../makers/makeNote'
import {Notes} from './Notes'

// NOTE: this test utilizes enzyme, in order to test the component props/methods
describe('NotesWithData', () => {
    it('fetches notes', () => {
        const mockApi = makeNoteApi({
            getNotes: jest.fn(),
        })

        const subject = shallow(<NotesWithData/>)
        expect(mockApi.getNotes).not.toHaveBeenCalled()


        subject.find(DataLoader).prop('dataSource')(mockApi)
        expect(mockApi.getNotes).toHaveBeenCalled()

    })

    it('renders Notes', () => {
        const subject = shallow(<NotesWithData/>)

        const response: NoteResponse = {notes: [makeNote()]}
        const rendered = subject.find(DataLoader).renderProp('render')(
            response,
            () => {},
        )

        const assessment = rendered.find(Notes)
        expect(assessment.exists()).toEqual(true)
    })
})
