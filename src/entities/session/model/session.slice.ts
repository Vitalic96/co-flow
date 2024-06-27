import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { sessionApi } from '../api/session.api'

type SessionSliceState =
  | {
      isAuth: true
      accessToken: string
    }
  | {
      isAuth: false
      accessToken: null
    }

const initialState: SessionSliceState = {
  isAuth: false,
  accessToken: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState satisfies SessionSliceState as SessionSliceState,
  reducers: {
    clearSessionData: (state) => {
      state.isAuth = initialState.isAuth
      state.accessToken = initialState.accessToken
    },
    setSessionData: (state, action: PayloadAction<SessionSliceState>) => {
      state.isAuth = action.payload.isAuth
      state.accessToken = action.payload.accessToken
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(sessionApi.endpoints.signIn.matchFulfilled, sessionApi.endpoints.signUp.matchFulfilled),
      (state: SessionSliceState, { payload }) => {
        const newState: SessionSliceState = {
          isAuth: true,
          accessToken: payload.accessToken,
        }
        state.isAuth = state.isAuth = newState.isAuth
        state.accessToken = newState.accessToken
      },
    )
    builder.addMatcher(
      isAnyOf(sessionApi.endpoints.signIn.matchRejected, sessionApi.endpoints.signUp.matchRejected),
      (state: SessionSliceState, { payload }) => {
        state.isAuth = false
        state.accessToken = null
      },
    )
  },
})

export const selectIsAuth = (state: RootState) => state.session.isAuth

export const { clearSessionData, setSessionData } = sessionSlice.actions
