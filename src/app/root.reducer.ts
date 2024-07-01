import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from 'entities/session'
import { themeSlice } from 'entities/theme'
import { baseApi } from 'shared/api'

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
