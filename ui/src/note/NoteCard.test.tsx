import React from "react"
import {NoteCard, NoteCardProps} from './NoteCard'
import {makeNote} from '../makers/makeNote'
import {render, screen} from '@testing-library/react'

describe("NoteCard", () => {
    let props: NoteCardProps;

    beforeEach(() => {
        props = {
            note: makeNote(),
        };
    });

    it("renders the card", () => {
        props.note = makeNote({
            title: "some-title",
            id: "some-id",
            data: "some-data",
        })

        render(<NoteCard {...props}/>);

        expect(screen.getByTestId('title').textContent).toEqual("some-title")
        expect(screen.getByTestId('data').textContent).toEqual("some-data")
    });
})
