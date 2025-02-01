import {createSlice} from "@reduxjs/toolkit";
import {ComponentInfoType} from "./componentsReducer";
import cloneDeep from 'lodash.clonedeep'

const INIT_COPIED_COMPONENT: ComponentInfoType | null = null

export const copySlice = createSlice({
    name: 'copy',
    initialState: INIT_COPIED_COMPONENT,
    reducers: {
        copySelectedComponent: (state, action) => {
            console.log('copySelectedComponent', action.payload)
            return cloneDeep(action.payload)
        },
    }
})

export const {  copySelectedComponent } = copySlice.actions

export default copySlice.reducer