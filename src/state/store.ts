import { configureStore } from "@reduxjs/toolkit";
import sesh from './Session/sessionSlice'

export const store = configureStore({
    reducer: {
        session: sesh
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;