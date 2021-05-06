import {space} from './space'
import {Colors} from './colors'
import {roundedCorner} from './utilities'
import {onDesktop} from './mediaQueries'

export const standardBorder = {border: `1px solid ${Colors.ALTO}`}

export const containerStyles = {
    noteContainer: {
        ...roundedCorner,
        ...standardBorder,
        background: Colors.WHITE,
        padding: `${space(2)} ${space(1)}`,
        margin: `${space(1)} ${space(1)}`,
        width: '35%',
        ...onDesktop({
            padding: `${space(1)} ${space(1)}`,
            width: '20%',
        }),
    },
}
