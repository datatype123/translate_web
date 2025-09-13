import { combineEpics } from "redux-observable";
import { userEpics } from "./user/userSlice";
import {textEpics} from "./text/textSlice";



const rootEpics = combineEpics(
    ...userEpics,
    ...textEpics
);

export default rootEpics;