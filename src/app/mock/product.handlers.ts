import { HttpResponse, delay, http } from 'msw'
import { db } from './db'
import { config } from 'shared/lib'
import { v4 } from 'uuid'
import { z } from 'zod'

const createProductValidation = z.object({
  title: z.string({ message: 'Title is required' }),
  text: z.string({ message: 'Text is required' }),
  price: z.number({ message: 'Price is required' }),
  quantity: z.number({ message: 'Quantity is required' }),
})

export const productHandlers = [
  http.get(`${config.API_ENDPOINT}/products`, async () => {
    await delay(config.API_DELAY)

    const products = db.product.findMany({ take: 10 })

    return HttpResponse.json(products)
  }),
  http.get(`${config.API_ENDPOINT}/products/:productId`, async ({ params }) => {
    await delay(config.API_DELAY)

    const { productId } = params as { productId: string }
    const product = db.product.findFirst({ where: { productId: { equals: productId } } })
    return HttpResponse.json(product ?? 'Not found', { status: product ? 200 : 404 })
  }),
  http.delete(`${config.API_ENDPOINT}/products/:productId`, async ({ params }) => {
    await delay(config.API_DELAY)

    const { productId } = params as { productId: string }
    const product = db.product.findFirst({ where: { productId: { equals: productId } } })
    if (!product) return HttpResponse.json('Not found', { status: 404 })

    db.product.delete({ where: { productId: { equals: productId } } })
    return HttpResponse.json(null, { status: 200 })
  }),
  http.post(`${config.API_ENDPOINT}/products`, async ({ request }) => {
    await delay(config.API_DELAY)

    const formData = await request.formData()
    const data = {
      title: formData.get('title'),
      text: formData.get('text'),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
    }

    try {
      const product = createProductValidation.parse(data)
      const newProduct = db.product.create({
        productId: v4(),
        image: './product1.jpg',
        title: product.title,
        text: product.text,
        price: product.price,
        quantity: product.quantity,
      })

      return HttpResponse.json({ productId: newProduct.productId })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),
  http.patch(`${config.API_ENDPOINT}/products/:productId`, async ({ request, params }) => {
    await delay(config.API_DELAY)

    const { productId } = params as { productId: string }
    const product = db.product.findFirst({ where: { productId: { equals: productId } } })
    if (!product) return HttpResponse.json('Not found1', { status: 404 })

    const formData = await request.formData()
    const data = {
      title: String(formData.get('title')) ?? undefined,
      text: String(formData.get('text')) ?? undefined,
      price: Number(formData.get('price')) ?? undefined,
      quantity: Number(formData.get('quantity')) ?? undefined,
    }

    try {
      const product = data
      db.product.update({
        where: { productId: { equals: productId } },
        data: {
          title: product.title,
          text: product.text,
          price: product.price,
          quantity: product.quantity,
        },
      })

      return HttpResponse.json(null, { status: 200 })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),
]
