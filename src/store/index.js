import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {bookSlice} from './api/BookSlice'
import {authSlice} from './api/AuthSlice'
import {userSlice} from './api/UserSlice'

export const store = configureStore({
  reducer: {
    [bookSlice.reducerPath]: bookSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(bookSlice.middleware)
    .concat(authSlice.middleware)
    .concat(userSlice.middleware),
})

setupListeners(store.dispatch)