import { createApi } from '@reduxjs/toolkit/query/react'
import { CURRENT_USER_TAG, PRODUCT_TAG } from './tags'
import { baseWithReauthQuery } from './base-with-reauth.query'

export const baseApi = createApi({
  tagTypes: [CURRENT_USER_TAG, PRODUCT_TAG],
  reducerPath: 'api',
  baseQuery: baseWithReauthQuery,
  endpoints: () => ({}),
})
