import {createSlice} from "@reduxjs/toolkit";


const INIT_SELECTED_ID = null

export const selectedIdSlice = createSlice({
    name: 'selectedId',
    initialState: INIT_SELECTED_ID,
    reducers: {
        setSelectedId: (state, action:{payload: any, type: string}) => {
            console.log("newId", action.payload)
            return action.payload
        },
        clearSelectedId: () => {
            return INIT_SELECTED_ID
        }
    }
})

export const {setSelectedId, clearSelectedId} = selectedIdSlice.actions

export default selectedIdSlice.reducer