import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.profile_pic = action.payload.profile_pic
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state, action) => {
            state._id = ''
            state.email = ''
            state.name = ''
            state.profile_pic = ''
            state.token = ''
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = userSlice.actions

export default userSlice.reducer