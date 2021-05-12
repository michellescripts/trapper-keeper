import React from 'react'
import {Notes} from './note/Notes'
import {NoteApiProvider} from './api/NoteApiContext'

function App() {
    return <NoteApiProvider>
        <h1>Trapper Keeper: Keep</h1>
        <Notes/>
    </NoteApiProvider>
}

export default App
