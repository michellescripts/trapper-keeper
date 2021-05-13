import React from 'react'
import {RouteNotFoundError} from './RouteNotFoundError'
import {Routes} from './Routes'
import {NavBar} from '../navigation/NavBar'

export interface GlobalRouteBasedComponentsProps {
    route: string;
}

export enum NavSection {
    NOTES = 'notes',
    TRASH = 'trash',
}

interface RouteInfo {
    pattern: RegExp;
    section?: NavSection;
}

export const GlobalRouteBasedComponents: React.FC<GlobalRouteBasedComponentsProps> = props => {

    const routes: Array<RouteInfo> = [
        {pattern: /^\/$/i, section: NavSection.NOTES},
        {pattern: /^\/trash$/i, section: NavSection.TRASH},
    ]

    const matchedRoute: RouteInfo | undefined = routes.filter(r => r.pattern.test(props.route))[0]

    if (matchedRoute === undefined) {
        return <RouteNotFoundError/>
    }

    return <>
        <NavBar currentPage={matchedRoute.section}/>
        <Routes/>
    </>
}
