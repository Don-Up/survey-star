import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer";
import componentsReducer, {ComponentInfoType} from "./componentsReducer";
import selectedIdReducer from "./selectIdReducer";
import copyReducer from "./copyReducer";
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer";


export type StateType = {
    user: UserStateType
    components: ComponentInfoType[]
    selectedId: string | null
    copy: ComponentInfoType | null
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        selectedId: selectedIdReducer,
        copy: copyReducer,
        pageInfo: pageInfoReducer,
    },
});