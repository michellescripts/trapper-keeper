import * as React from 'react'
import {RouteNotFoundError} from './RouteNotFoundError'
import {render} from '@testing-library/react'

describe('RouteNotFoundError', () => {
    it('renders the component with expected text', () => {
        const subject = render(<RouteNotFoundError/>)

        expect(subject.queryByText("Not Found")).toBeInTheDocument()
    })
})
