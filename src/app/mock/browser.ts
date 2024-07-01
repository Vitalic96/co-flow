import { setupWorker } from 'msw/browser'
import { productHandlers as productHandlers } from './product.handlers'
import { sessionHandlers, userHandlers } from './session.handlers'
import { startSeed } from './seed'
import { RequestHandler } from 'msw'

const handlers: RequestHandler[] = [...productHandlers, ...sessionHandlers, ...userHandlers]

startSeed()

export const worker = setupWorker(...handlers)
