import * as React from 'react'
import {render} from '@testing-library/react'
import {NavBar} from './NavBar'

describe('NavBar', () => {
    it('renders', () => {
        const subject = render(<NavBar/>)

        expect(subject.queryByText('Trapper Keeper: Keep')).toBeInTheDocument()
    })
})
