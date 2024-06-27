/**
 * Custom utility types
 */
type Nullable<T> = T | null

type Keys<T extends Record<string, unknown>> = keyof T

type Values<T extends Record<string, unknown>> = T[Keys<T>]

type Indexed<T = unknown> = { [key: string]: T }

/**
 * Type aliases
 */
type Phone = string

type Email = string

type Id = string

type DateIso = string

type Timestamp = number

type Penny = number

type Url = string

type Color = string

/**
 * Shared kernel
 */

declare type RootState = import('../src/app/app.store').RootState
declare type AppDispatch = import('../src/app/app.store').AppDispatch

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
