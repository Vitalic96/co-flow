import { z } from 'zod'

const envVariables = z.object({
  SITE_ENDPOINT: z.string().url(),
  API_ENDPOINT: z.string().url(),
  API_DELAY: z.string().transform(Number),
})

const env = envVariables.parse({
  API_ENDPOINT: import.meta.env.VITE_APP_API_ENDPOINT,
  SITE_ENDPOINT: import.meta.env.VITE_APP_SITE_ENDPOINT,
  API_DELAY: import.meta.env.VITE_APP_DELAY,
})

export const config = {
  API_ENDPOINT: env.API_ENDPOINT,
  SITE_ENDPOINT: env.SITE_ENDPOINT,
  API_DELAY: env.API_DELAY,
} as const
