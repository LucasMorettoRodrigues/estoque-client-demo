import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../services/auth.service'

type State = {
    authenticated: boolean,
    role: any
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        authenticated: !!getUser(),
        role: getUser()?.user.role
    } as State,
    reducers: {
        updateAuthentication: (state) => {
            state.authenticated = !!getUser()
            state.role = getUser()?.user.role
        }
    },
})

export const { updateAuthentication } = authenticationSlice.actions

export default authenticationSlice.reducer