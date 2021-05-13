import axios from 'axios'
import {NoteApi, NoteApiClient} from './NoteApi'
import {mockHttpServer} from '../testHelpers/server/mockHttpServer'
import {rest} from 'msw'

describe('NoteApi', () => {
    let subject: NoteApi
    const server = mockHttpServer()

    beforeEach(() => {
        subject = new NoteApiClient('http://localhost:3000', axios)
    })

    test('getNotes returns a list of notes', async () => {
        const body = {'notes': [{title: 'some-title'}, {title: 'some-other-title'}]}

        server.use(
            rest.get('http://localhost:3000/api/v1/note', (req, res, ctx) => {
                return res(ctx.json(body))
            }),
        )

        const result = await subject.getNotes()
        expect(result).toEqual(body)
    })

    test('getNotesDeleted returns a list of deleted notes', async () => {
        let deleted
        const body = {'notes': [{deleted: true}, {deleted: true}]}

        server.use(
            rest.get('http://localhost:3000/api/v1/note', (req, res, ctx) => {
                const query = req.url.searchParams
                deleted = query.get("showDeleted")

                return res(ctx.json(body))
            }),
        )

        const result = await subject.getNotesDeleted()
        expect(result).toEqual(body)
        expect(deleted).toEqual("true")
    })
})
