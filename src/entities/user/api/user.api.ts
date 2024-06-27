import { baseApi, invalidateAccessToken, CURRENT_USER_TAG } from 'shared/api'
import { userMapper } from '../lib/user.mapper'
import { type User } from '../model/user.model'
import { userRoutes } from './user.routes'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<User, void>({
      query: () => ({ url: userRoutes.USER, credentials: 'include' }),
      providesTags: [CURRENT_USER_TAG],
      transformResponse: userMapper,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (error) {
          dispatch(invalidateAccessToken())
        }
      },
    }),
  }),
})

export const { useCurrentUserQuery } = userApi
