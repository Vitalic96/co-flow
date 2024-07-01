import { userApi } from 'entities/user/api/user.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi, clearSessionData } from 'entities/session'
import { CURRENT_USER_TAG } from 'shared/api'
import { wait } from 'shared/lib'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'session/logout',
  async (_: unknown, { dispatch, getState }) => {
    try {
      const state = getState()
      if (state.session.isAuth)
        await dispatch(sessionApi.endpoints.logout.initiate({ refreshToken: state.session.refreshToken })).unwrap()
    } finally {
      dispatch(clearSessionData())

      await wait(10)
      dispatch(userApi.util.invalidateTags([CURRENT_USER_TAG]))
    }
  },
)
