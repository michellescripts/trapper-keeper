import {createUseStyles} from 'react-jss'
import {space} from '../styleGuide/space'
import {Colors} from '../styleGuide/colors'
import {typographyStyles} from '../styleGuide/typography'

export const navHeight = space(4)

export const useNavBarStyles = createUseStyles({
    link: {
        display: 'inline-block',
        ...typographyStyles.link,
        lineHeight: navHeight,
        borderBottomWidth: '4px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        '&:not(last-child)': {
            marginRight: space(3),
        },
    },
    currentPageLink: {
        color: Colors.SHARK,
        borderBottomColor: Colors.CASHMERE,
    },
})
