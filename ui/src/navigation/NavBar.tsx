import React from 'react'
import {NavSection} from '../routes/GlobalRouteBasedComponents'
import {useNavBarStyles} from './NavBar.styles'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import {AppRoute} from '../routes/AppRoute'

interface NavBarProps {
    currentPage?: NavSection;
}

export const NavBar: React.FC<NavBarProps> = (props) => {
    const navBarStyles = useNavBarStyles()

    const linkClass = (page: NavSection): string | undefined => {
        if (props.currentPage === page) {
            return classNames(navBarStyles.link, navBarStyles.currentPageLink)
        } else {
            return navBarStyles.link
        }
    }

    const createLink = (page: NavSection): React.ReactNode => {
        switch (page) {
            case NavSection.NOTES:
                return <Link to={AppRoute.ROOT} className={linkClass(page)}> Notes </Link>
            case NavSection.TRASH:
                return <Link to={AppRoute.TRASH} className={linkClass(page)}> Trash </Link>
            default:
                return undefined
        }
    }

    return <>
        <h1>Trapper Keeper</h1>
        <nav data-testid="navigation">
            {createLink(NavSection.NOTES)}
            {createLink(NavSection.TRASH)}
        </nav>
    </>
}
