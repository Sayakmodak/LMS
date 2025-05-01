import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            isAuthenticated = true;
        },
        userLoggedOut: (state, action) => {
            state.user = null;
            isAuthenticated = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer