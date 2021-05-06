import {Colors} from "./colors";
import {onDesktop} from "./mediaQueries";

export const typographyStyles = {
    header1: {
        fontSize: "2rem",
        fontWeight: 600,
        color: Colors.SHARK,

        ...onDesktop({
            fontSize: "2.2rem",
        }),
    },
    header2: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: Colors.SHARK,
        ...onDesktop({
            fontSize: "1.7rem",
        }),
    },
    paragraph: {
        fontSize: "1.3rem",
        fontWeight: "normal",
        lineHeight: "1.8rem",
        color: Colors.SHARK,
        ...onDesktop({
            fontSize: "1.5rem",
        }),
    },
    paragraphAlternate: {
        extend: "paragraph",
        color: Colors.HIMALAYA,
    },
    link: {
        textDecoration: "none",
        fontWeight: "600",
        color: Colors.CASAL,
        "&:hover": {
            color: Colors.SHARK,
        },
    },
    errorText: {
        color: Colors.FLAMINGO,
        fontSize: "1.2rem",
        fontWeight: "500",
    },
};
