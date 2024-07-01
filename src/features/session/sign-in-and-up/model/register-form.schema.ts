import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
