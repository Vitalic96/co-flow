import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from 'entities/session'
import { RegisterDto } from 'entities/session/dto/register.dto'

export const registerThunk = createAsyncThunk<void, RegisterDto, { state: RootState }>(
  'session/register',
  async (body: RegisterDto, { dispatch, rejectWithValue }) => {
    try {
      const a = await dispatch(sessionApi.endpoints.register.initiate(body))
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
