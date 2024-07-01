import { HttpResponse, delay, http } from 'msw'
import { db } from './db'
import { config } from 'shared/lib'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { z } from 'zod'

const accessTokenSecret = 'accessTokenSecret'
const refreshTokenSecret = 'refreshTokenSecret'
const oldRefreshTokens = localStorage.getItem('refreshTokens')
let refreshTokens: string[] = oldRefreshTokens ? JSON.parse(oldRefreshTokens) : []
const saveRefreshTokens = () => localStorage.setItem('refreshTokens', JSON.stringify(refreshTokens))
const expiresIn = '20m'

const userValidation = z.object({
  email: z.string({ message: 'Email is required' }).email(),
  password: z.string({ message: 'Password is required' }),
})

const tokenValidation = z.object({
  id: z.string({ message: 'Id is required' }),
  email: z.string({ message: 'Email is required' }).email(),
})

const refreshTokenValidation = z.object({
  refreshToken: z.string({ message: 'Refresh token is required' }),
})

export const sessionHandlers = [
  http.post(`${config.API_ENDPOINT}/users/login`, async ({ request }) => {
    await delay(config.API_DELAY)

    try {
      const body = await request.json()
      const user = userValidation.parse(body)

      const existsUser = db.user.findFirst({ where: { email: { equals: user.email } } })
      if (!existsUser) return HttpResponse.json('Not found User', { status: 404 })

      if (existsUser.password !== user.password) return HttpResponse.json('Password do not match', { status: 400 })

      const { userId: id, email } = existsUser
      const accessToken = jwt.sign({ id, email }, accessTokenSecret, { expiresIn })
      const refreshToken = jwt.sign({ id, email }, refreshTokenSecret)

      refreshTokens.push(refreshToken)
      saveRefreshTokens()

      return HttpResponse.json({ accessToken, refreshToken })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),

  http.post(`${config.API_ENDPOINT}/users/logout`, async ({ request }) => {
    try {
      const body = await request.json()
      const { refreshToken } = refreshTokenValidation.parse(body)

      refreshTokens = refreshTokens.filter((token) => refreshToken !== token)
      saveRefreshTokens()

      return HttpResponse.json('Logout successful', { status: 200 })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),

  http.post(`${config.API_ENDPOINT}/users/refresh-token`, async ({ request }) => {
    try {
      const body = await request.json()
      const { refreshToken } = refreshTokenValidation.parse(body)

      if (!refreshTokens.includes(refreshToken)) return HttpResponse.json('Refresh token not found', { status: 403 })

      const decoded = jwt.verify(refreshToken, refreshTokenSecret)
      const { id, email } = tokenValidation.parse(decoded)

      const accessToken = jwt.sign({ id, email }, accessTokenSecret, { expiresIn })

      return HttpResponse.json({ accessToken, refreshToken }, { status: 200 })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),

  http.post(`${config.API_ENDPOINT}/users/register`, async ({ request }) => {
    await delay(config.API_DELAY)

    try {
      const body = await request.json()
      const user = userValidation.parse(body)

      const existEmail = db.user.findFirst({ where: { email: { equals: user.email } } })
      if (existEmail) return HttpResponse.json('Email already exists', { status: 409 })

      const newUser = db.user.create({ userId: v4(), email: user.email, password: user.password })

      return HttpResponse.json({ id: newUser.userId })
    } catch (err) {
      if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
      return HttpResponse.json('Unknown error', { status: 500 })
    }
  }),
]

export const userHandlers = [
  http.get(`${config.API_ENDPOINT}/cabinet/user`, async ({ request }) => {
    await delay(config.API_DELAY)

    const authHeader = request.headers.get('authorization')
    if (!authHeader) return HttpResponse.json(null, { status: 403 })
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, accessTokenSecret)

      try {
        const { id } = tokenValidation.parse(decoded)

        const user = db.user.findFirst({ where: { userId: { equals: id } } })
        if (!user) return HttpResponse.json('Not found User', { status: 404 })

        return HttpResponse.json(user)
      } catch (err) {
        if (err instanceof z.ZodError) return HttpResponse.json(err.issues, { status: 400 })
        return HttpResponse.json('Unknown error', { status: 500 })
      }
    } catch (e) {
      return HttpResponse.json('token expired', { status: 401 })
    }
  }),
]
