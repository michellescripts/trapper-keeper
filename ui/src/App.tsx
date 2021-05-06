import React from 'react'
import {Notes} from './Note/Notes'
import {NoteApiProvider} from './API/NoteApiContext'

function App() {
    return <NoteApiProvider>
        <Notes/>
    </NoteApiProvider>
}

export default App
