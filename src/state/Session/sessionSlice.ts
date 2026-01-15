import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    value: {
        access_token: string,
        expires_at:number,
        expires_in:number,
        refresh_token: string,
        token_type: string,
        user: {
            email: string,
            id: string,
            role: string
        }
    } | null
}

const initialState: initialType = {
    value: null
}

const sesh = createSlice({
    name: "sesh",
    initialState,
    reducers: {
        setSession(state, action){
            state.value = action.payload
        }
    }
})

export const {setSession} = sesh.actions;
export default sesh.reducer;