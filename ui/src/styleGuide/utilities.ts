import {JssStyle} from "jss";

export type StyleDefinition = Record<string, JssStyle | string>

export const roundedCorner = {
    borderRadius: "1.3rem",
};

export const conditional = (
    condition: string,
    baseStyles: StyleDefinition,
    nestedStyles: StyleDefinition = {},
): StyleDefinition => {
    const conditionalStyles: StyleDefinition = {};

    if (Object.keys(baseStyles).length > 0) {
        conditionalStyles[`&${condition}`] = baseStyles;
    }

    Object.keys(nestedStyles).forEach(key => {
        let newKey: string;
        if (key.startsWith("&")) {
            newKey = `&${condition}${key.slice(1)}`;
        } else {
            newKey = `&${condition} $${key}`;
        }
        conditionalStyles[newKey] = nestedStyles[key];
    });
    return conditionalStyles;
};

export const fullViewport = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
