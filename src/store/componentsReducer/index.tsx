import {ComponentPropsType} from "../../components/QuestionnaireComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ComponentInfoType = {
    id: string
    type: string
    title: string
    props: ComponentPropsType
}

const INIT_STATE: ComponentInfoType[] = []

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        resetComponents: (state: ComponentInfoType[], action: PayloadAction<ComponentInfoType[]>) => {
            return action.payload
        }
    }
})

export const {resetComponents} = componentsSlice.actions

export default componentsSlice.reducer