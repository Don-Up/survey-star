import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PageInfoType = {
    title: string
    description?: string
    js?: string
    css?: string
    isPublished?: boolean
}

// Define INIT_STATE
export const INIT_STATE: PageInfoType = {
    title: "",
    description: "",
    js: "",
    css: "",
}

// Define pageInfoSlice with createSlice
export const pageInfoSlice = createSlice({
    name: "pageInfo",
    initialState: INIT_STATE,
    reducers: {
        resetPageInfo: (state, action: PayloadAction<PageInfoType>) => {
            return action.payload
        },
        // changePageTitle
        changePageTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
    },
})

// Export actions and reducer
export const {resetPageInfo, changePageTitle} = pageInfoSlice.actions
export default pageInfoSlice.reducer
