import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice.js'
import messagesReducer from '../features/messages/messagesSlice.js'
import connectionsReducer from '../features/connections/connectionsSlice.js'

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        users: usersReducer,
        connections: connectionsReducer
    }
})