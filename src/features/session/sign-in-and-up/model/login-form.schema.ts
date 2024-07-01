import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(7),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
