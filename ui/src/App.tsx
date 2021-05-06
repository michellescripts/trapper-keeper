import React from 'react'
import {Notes} from './Note/Notes'
import {NoteApiProvider} from './API/NoteApiContext'

function App() {
    return <NoteApiProvider>
        <h1>Trapper Keeper: Keep</h1>
        <Notes/>
    </NoteApiProvider>
}

export default App
