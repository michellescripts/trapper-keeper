import {createUseStyles} from 'react-jss'
import {typographyStyles} from './typography'
import {containerStyles} from './containers'
import {mediaHelpers} from './mediaQueries'

export const useStyleGuide = createUseStyles({
    ...typographyStyles,
    ...containerStyles,
    ...mediaHelpers,
})
