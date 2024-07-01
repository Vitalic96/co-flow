import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  user: {
    userId: primaryKey(String),
    email: String,
    password: String,
  },
  product: {
    productId: primaryKey(String),
    image: String,
    title: String,
    text: String,
    price: Number,
    quantity: Number,
  },
})
