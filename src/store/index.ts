import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer";
import componentsReducer, {ComponentInfoType} from "./componentsReducer";
import selectedIdReducer from "./selectIdReducer";
import copyReducer from "./copyReducer";
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
    // user information
    user: UserStateType
    // the component list in the questionnaire with a specified id
    components: StateWithHistory<ComponentInfoType[]>
    // used for retrieving the selected component
    selectedId: string | null
    // the copied component
    copy: ComponentInfoType | null
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: undoable(componentsReducer, {
           limit: 20,
           filter: excludeAction([
               "components/resetComponents"
           ])
        }),
        selectedId: selectedIdReducer,
        copy: copyReducer, // used for copy operation
        pageInfo: pageInfoReducer,
    },
});