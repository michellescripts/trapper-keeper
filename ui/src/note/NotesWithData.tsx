import * as React from 'react'
import {DataLoader} from '../api/DataLoader'
import {NoteResponse} from '../api/NoteResponse'
import {NoteApi} from '../api/NoteApi'
import {Notes} from './Notes'

export const NotesWithData: React.FC = () =>
    <DataLoader<NoteResponse | undefined>
        dataSource={(api: NoteApi): Promise<NoteResponse | undefined> =>
            api.getNotes()
        }
        render={(data: NoteResponse | undefined): React.ReactNode =>
            <Notes
                notes={
                    data === undefined
                        ? undefined
                        : data['notes']
                }
            />
        }
    />
