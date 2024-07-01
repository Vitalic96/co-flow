import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { sessionApi } from '../api/session.api'

type SessionSliceState =
  | {
      isAuth: true
      accessToken: string
      refreshToken: string
    }
  | {
      isAuth: false
      accessToken: null
      refreshToken: null
    }

const initialState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
} as const

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState satisfies SessionSliceState as SessionSliceState,
  reducers: {
    clearSessionData: (state) => {
      state.isAuth = initialState.isAuth
      state.accessToken = initialState.accessToken
      state.refreshToken = initialState.refreshToken
    },
    setSessionData: (state, action: PayloadAction<SessionSliceState>) => {
      state.isAuth = action.payload.isAuth
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(sessionApi.endpoints.login.matchFulfilled), (state: SessionSliceState, { payload }) => {
      const newState: SessionSliceState = {
        isAuth: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      }
      state.isAuth = newState.isAuth
      state.refreshToken = newState.refreshToken
      state.accessToken = newState.accessToken
    })
  },
})

export const selectIsAuth = (state: RootState) => state.session.isAuth

export const { clearSessionData, setSessionData } = sessionSlice.actions
