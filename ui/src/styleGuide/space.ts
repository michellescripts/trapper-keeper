export const space = (coefficient = 1): string =>
    `${coefficient * 0.8}rem`;

export const pageMargin = space(2);

type Margin = {
    top: string | number;
    bottom: string | number;
    left: string | number;
    right: string | number;
};
export const removePageMargin = (overrides: Partial<Margin> = {}): {
    margin: Margin;
} => ({
    margin: {
        top: `-${pageMargin}`,
        bottom: `-${pageMargin}`,
        left: `-${pageMargin}`,
        right: `-${pageMargin}`,
        ...overrides,
    },
});
