import { productApi } from './../../entities/product/api/product.api'
import { faker } from '@faker-js/faker'
import { db } from './db'

export const startSeed = () => {
  const users = db.user.getAll()

  if (users.length > 0) return

  db.user.create({ userId: '1', email: 'login@gmail.com', password: '12345678' })

  // faker.seed([1, 2, 3, 4, 5])

  const productMock = faker.helpers.multiple(
    () => ({
      productId: faker.string.uuid(),
      image: './product1.jpg',
      status: faker.helpers.arrayElement(['Draft', 'Publish', 'Trash']),
      title: faker.animal.bird(),
      text: faker.lorem.lines(3),
      price: faker.number.int(200),
      quantity: faker.number.int(10),
    }),
    { count: 4 },
  )
  productMock.forEach((row) => db.product.create(row))
}
