import * as React from 'react'
import {render, within} from '@testing-library/react'
import {NavBar} from './NavBar'
import {NavSection} from '../routes/GlobalRouteBasedComponents'
import {BrowserRouter as Router} from 'react-router-dom'


function getClass(nav: HTMLElement, page: string) {
    let notesClass: String[] = []
    within(nav).getByText(page).classList.forEach(val => {
        notesClass.push(val.split('-')[0])
    })
    return notesClass
}

describe('NavBar', () => {
    it('renders page ID and nav', () => {
        const subject = render(<Router><NavBar/></Router>)

        expect(subject.queryByText('Trapper Keeper')).toBeInTheDocument()
        expect(subject.queryByText('Notes')).toBeInTheDocument()
        expect(subject.queryByText('Trash')).toBeInTheDocument()
    })

    it('sets active for current route when page is Notes', () => {
        const notesPage = render(<Router><NavBar currentPage={NavSection.NOTES}/></Router>)

        const notesNav = notesPage.getByTestId('navigation')
        expect(getClass(notesNav, 'Notes').includes('currentPageLink')).toBeTruthy()
        expect(getClass(notesNav, 'Trash').includes('currentPageLink')).toBeFalsy()
    })

    it('sets active for current route when page is Trash', () => {
        const trashPage = render(<Router><NavBar currentPage={NavSection.TRASH}/></Router>)

        const trashNav = trashPage.getByTestId('navigation')
        expect(getClass(trashNav, 'Notes').includes('currentPageLink')).toBeFalsy()
        expect(getClass(trashNav, 'Trash').includes('currentPageLink')).toBeTruthy()
    })

    it('sets nothing active when page is undefined', () => {
        const trashPage = render(<Router><NavBar/></Router>)

        const trashNav = trashPage.getByTestId('navigation')
        expect(getClass(trashNav, 'Notes').includes('currentPageLink')).toBeFalsy()
        expect(getClass(trashNav, 'Trash').includes('currentPageLink')).toBeFalsy()
    })
})
