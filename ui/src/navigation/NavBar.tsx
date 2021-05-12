import React from 'react'
import {NavSection} from '../routes/GlobalRouteBasedComponents'

interface AuthenticatedNavBarProps {
    currentPage?: NavSection;
}

export const NavBar: React.FC<AuthenticatedNavBarProps> = (props) => {
    console.log(props.currentPage)
    return <nav data-testid="navigation"><h1>Trapper Keeper: Keep</h1></nav>
}
