import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(7),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>
