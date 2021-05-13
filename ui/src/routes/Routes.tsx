import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {AppRoute} from './AppRoute'
import {RouteNotFoundError} from './RouteNotFoundError'
import {NotesWithTrashData} from '../note/NotesWithTrashData'
import {NotesWithData} from '../note/NotesWithData'

export const Routes: React.FC = () => <Switch>
    <Route exact path={AppRoute.ROOT} component={NotesWithData}/>
    <Route exact path={AppRoute.TRASH} component={NotesWithTrashData}/>
    <Route exact path={AppRoute.NOT_FOUND} component={RouteNotFoundError}/>
</Switch>
