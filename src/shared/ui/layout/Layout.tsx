import classNames from 'classnames'
import { type ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import './Layout.scss'

type Props = {
  headerSlot?: ReactNode
  sidebarSlot?: ReactNode
  dark?: boolean
}

export function Layout(props: Props) {
  return (
    <div
      className={classNames('layout', {
        'layout--with-sidebar': props.sidebarSlot,
        'layout--dark': props.dark,
      })}
    >
      {props.headerSlot}
      {props.sidebarSlot}

      <Outlet />

      <ScrollRestoration />
    </div>
  )
}
