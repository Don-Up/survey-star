import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type UserStateType = {
    name: string | null
    email: string | null
}

const INIT_STATE: UserStateType = {
    name: "",
    email: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState: INIT_STATE,
    reducers: {
        loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return action.payload
        },
        logoutReducer: (state) => INIT_STATE
    }
})

export const { loginReducer, logoutReducer} = userSlice.actions

export default userSlice.reducer