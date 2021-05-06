import {jss} from 'react-jss'
import {typographyStyles} from './typography'
import {pageMargin} from './space'
import {Colors} from './colors'

jss.createStyleSheet(
    {
        '@global': {
            a: {
                cursor: 'pointer',
                ...typographyStyles.link,
            },
            h1: {
                ...typographyStyles.header1,
            },
            h2: {
                ...typographyStyles.header2,
            },
            p: {
                ...typographyStyles.paragraph,
            },
            html: {
                fontSize: '10px',
                boxSizing: 'border-box',
                backgroundColor: Colors.WHITE,
            },
            body: {
                margin: pageMargin,
                fontSize: '1.4rem',
                fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                color: Colors.SHARK,
            },
            strong: {
                fontWeight: 'bold',
            },
            b: {
                fontWeight: 'bold',
            },
            '*, *:before, *:after': {
                boxSizing: 'inherit',
            }
        }
    }
).attach()
