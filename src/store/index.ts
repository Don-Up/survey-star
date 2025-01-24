import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer";
import componentsReducer, {ComponentInfoType} from "./componentsReducer";
import selectedIdReducer from "./selectIdReducer";


export type StateType = {
    user: UserStateType
    components: ComponentInfoType[]
    selectedId: string | null
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        selectedId: selectedIdReducer,
    },
});