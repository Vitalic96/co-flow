import { sessionRoutes } from 'entities/session/api/session.routes'
import { http, HttpResponse } from 'msw'
import { config } from 'shared/lib'
import { faker } from '@faker-js/faker'

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
})

users.push({ id: '1', email: 'login@gmail.com', password: '12345678' })

export const handlers = [
  http.post(`${config.API_ENDPOINT}/register`, async ({ request }) => {
    const userData = (await request.json()) as any

    const user = users.find((u) => u.email === userData.email)

    if (user) return HttpResponse.error()

    users.push(userData)

    return HttpResponse.json({ status: 'ok' })
  }),
  http.post(`${config.API_ENDPOINT}/login`, async ({ request }) => {
    const userData = (await request.json()) as any

    const user = users.find((u) => u.email === userData.email)

    if (!user) return HttpResponse.error()

    return HttpResponse.json({})
  }),
  http.post(`${config.API_ENDPOINT}/logout`, () => {
    return HttpResponse.json({})
  }),
  http.get(`${config.API_ENDPOINT}/user`, () => {
    return HttpResponse.json(users[users.length - 1] ?? {})
  }),
]
