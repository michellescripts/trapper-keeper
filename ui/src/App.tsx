import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {NoteApiProvider} from './api/NoteApiContext'
import {GlobalRouteBasedComponents} from './routes/GlobalRouteBasedComponents'

const App: React.FC = () => {
    return <NoteApiProvider>
        <Router>
            <Route
                path="*"
                render={(routeProps): React.ReactNode =>
                    <GlobalRouteBasedComponents route={routeProps.location.pathname}/>
                }
            />
        </Router>
    </NoteApiProvider>
}

export {App}
