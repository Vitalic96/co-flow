import { z } from 'zod'
import { productImageValidation } from 'entities/product'

export const updateProductFormSchema = z.object({
  image: productImageValidation.optional(),
  imagePreview: z.string().min(1, 'The photo is required'),
  title: z.string().min(1).optional(),
  text: z.string().min(1).optional(),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0),
})

export type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>
