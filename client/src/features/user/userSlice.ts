/* eslint-disable @typescript-eslint/consistent-type-imports */
import { createSlice } from "@reduxjs/toolkit"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"
import { UserDto } from "../../app/types"

interface InitialState {
    user: UserDto | null
    isAuthenticated: boolean
    users: UserDto[] | null
    current: UserDto | null
    token?: string
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    users: null,
    current: null,
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.current = null
            state.isAuthenticated = false
            state.token = undefined
        },
        resetUser: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token
                state.isAuthenticated = true
                state.current = action.payload.user
                state.user = action.payload.user
            })
            .addMatcher(userApi.endpoints.registerUser.matchFulfilled, (state, action) => {
                state.token = action.payload.token
                state.isAuthenticated = true
                state.current = action.payload.user
                state.user = action.payload.user
            })
            .addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
                state.users = action.payload
            })
            .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
                state.user = action.payload

                if (state.current?.id === action.payload.id) {
                    state.current = action.payload
                }
            })
            .addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action) => {
                if (state.current?.id === action.payload.id) {
                    state.current = action.payload
                }
            })
            .addMatcher(userApi.endpoints.login.matchRejected, (state) => {
                state.isAuthenticated = false
                state.token = undefined
            })
    },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectCurrent = (state: RootState) => state.auth.current
export const selectUsers = (state: RootState) => state.auth.users
