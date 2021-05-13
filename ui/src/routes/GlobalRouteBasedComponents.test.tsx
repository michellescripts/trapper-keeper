import React from 'react'
import {GlobalRouteBasedComponents} from './GlobalRouteBasedComponents'
import {BrowserRouter as Router} from 'react-router-dom'
import {render} from '@testing-library/react'
import {NoteApiProvider} from '../api/NoteApiContext'

describe('GlobalRouteBasedComponents', () => {
    interface TestCase {
        route: string;
        shouldRenderNav: boolean;
    }

    const testCases: TestCase[] = [
        {
            route: '/',
            shouldRenderNav: true,
        },
        {
            route: '/trash',
            shouldRenderNav: true,
        },
        {
            route: '/bogus',
            shouldRenderNav: false,
        },
    ]

    describe('nav bar', () => {
        testCases.forEach(testCase => {
            if (testCase.shouldRenderNav) {
                it(`should be visible on the route "${testCase.route}"`, () => {
                    const subject = render(
                        <NoteApiProvider>
                            <Router>
                                <GlobalRouteBasedComponents route={testCase.route}/>
                            </Router>
                        </NoteApiProvider>
                    )
                    expect(subject.queryByTestId('navigation')).toBeInTheDocument()
                })
            } else {
                it(`should not be visible on the route "${testCase.route}"`, () => {
                    const subject = render(
                        <NoteApiProvider>
                            <Router>
                                <GlobalRouteBasedComponents route={testCase.route}/>
                            </Router>
                        </NoteApiProvider>
                    )
                    expect(subject.queryByTestId('navigation')).not.toBeInTheDocument()
                })
            }
        })
    })

    describe('Route not found', () => {
        it('should render a not found component', () => {
            const subject = render(
                <NoteApiProvider>
                    <Router>
                        <GlobalRouteBasedComponents route="/bogus"/>
                    </Router>
                </NoteApiProvider>
            )
            expect(subject.queryByTestId('not-found')).toBeInTheDocument()
        })
    })
})
