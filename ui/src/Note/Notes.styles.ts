import { createUseStyles } from "react-jss";
import {space} from '../styleGuide/space'

export const useNotesStyles = createUseStyles({
    notes: {
        margin: {
            top: space(3),
            right: "auto",
            bottom: 0,
            left: "auto",
        },
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});
