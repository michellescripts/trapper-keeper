import React from 'react'
import {Note} from './Note'
import {useStyleGuide} from '../styleGuide/styleGuide'

export interface NoteCardProps {
    note: Note
}

export const NoteCard: React.FC<NoteCardProps> = (props) => {
    const {title, data} = props.note
    const styleGuide = useStyleGuide();

    return <>
        <div className={styleGuide.noteContainer}>
            <h2 data-testid={'title'}>
                {title}
            </h2>
            <p data-testid={'data'}>
                {data}
            </p>
        </div>
    </>
}
