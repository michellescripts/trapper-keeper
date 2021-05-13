import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {AppRoute} from './AppRoute'
import {Notes} from '../note/Notes'
import {RouteNotFoundError} from './RouteNotFoundError'
import {Trash} from '../note/Trash'

export const Routes: React.FC = () => <Switch>
    <Route exact path={AppRoute.ROOT} component={Notes}/>
    <Route exact path={AppRoute.TRASH} component={Trash}/>
    <Route exact path={AppRoute.NOT_FOUND} component={RouteNotFoundError}/>
</Switch>
