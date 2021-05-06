import {Styles} from "jss";

export const onDesktop = (styles: Styles): Record<string, Styles> => {
    return {
        "@media (min-width: 600px)": {
            "body &": {
                ...styles,
            },
        },
    };
};

export const mediaHelpers = {
    mobileOnly: {
        ...onDesktop({
            display: "none",
        }),
    },
    desktopOnly: {
        display: "none",
        ...onDesktop({
            display: "initial",
        }),
    },
};
