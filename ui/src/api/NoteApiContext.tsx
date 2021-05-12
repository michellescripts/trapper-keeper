import React from 'react'
import {NoteApi, NoteApiClient} from './NoteApi'
import axios from 'axios'

interface NoteApiProviderProps {
    children?: React.ReactNode;
}

const NoteApiContext = React.createContext<NoteApi | undefined>(undefined)

export const NoteApiProvider = ({children}: NoteApiProviderProps) =>
    <NoteApiContext.Provider value={new NoteApiClient('http://localhost:3000', axios)}>
        {children}
    </NoteApiContext.Provider>


export const useNoteApi = (): NoteApi => {
    const client = React.useContext(NoteApiContext)
    if (client === undefined) {
        throw new Error('useNoteApi must be used within a NoteApiProvider')
    }
    return client
}
