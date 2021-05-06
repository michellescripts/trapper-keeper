import {conditional} from "./utilities";

describe("style utilities", () => {
    describe("conditional", () => {
        it("nests the base styles under the condition", () => {
            expect(conditional(
                "[type='submit']",
                {
                    border: "1px solid red",
                },
            )).toEqual(
                {
                    "&[type='submit']": {
                        border: "1px solid red",
                    },
                });
        });

        it("modifies nested class references", () => {
            expect(conditional(
                ":hover",
                {},
                {
                    classReferredToInThisStylesheet: {
                        margin: "auto",
                    },
                    someOtherClass: {
                        border: "1px solid red",
                    },
                })).toEqual(
                {
                    "&:hover $classReferredToInThisStylesheet": {
                        margin: "auto",
                    },
                    "&:hover $someOtherClass": {
                        border: "1px solid red",
                    },
                },
            );
        });

        it("modifies conditions", () => {
            expect(conditional(
                ":hover",
                {},
                {
                    "&:first-child": {
                        backgroundColor: "green",
                    },
                })).toEqual(
                {
                    "&:hover:first-child": {
                        backgroundColor: "green",
                    },
                },
            );
        });

        it("combines base styles and nested styles", () => {
            expect(conditional(
                ":focus",
                {
                    borderRadius: "100%",
                },
                {
                    "&:first-child": {
                        backgroundColor: "green",
                    },
                    someClass: {
                        color: "pink",
                    },
                })).toEqual(
                {
                    "&:focus": {
                        borderRadius: "100%",
                    },
                    "&:focus:first-child": {
                        backgroundColor: "green",
                    },
                    "&:focus $someClass": {
                        color: "pink",
                    },
                },
            );
        });
    });
});
