import { productImageValidation } from 'entities/product'
import { z } from 'zod'

export const createProductFormSchema = z.object({
  image: productImageValidation.refine((file) => file, 'The photo is required'),
  title: z.string().min(1),
  text: z.string().min(1),
  price: z.string().min(1).transform(Number),
  quantity: z.string().min(1).transform(Number),
})

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
