import { faker } from '@faker-js/faker'

export const transaction = faker.helpers
  .multiple(
    () => {
      return {
        title: faker.animal.cat(),
        date: faker.date.between({ from: new Date().setFullYear(new Date().getFullYear() - 1), to: new Date() }),
        price: faker.number.int({ min: -50, max: 1000 }),
      }
    },
    { count: { min: 30, max: 50 } },
  )
  .sort((a, b) => b.date.getTime() - a.date.getTime())
