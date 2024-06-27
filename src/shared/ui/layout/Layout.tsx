import classNames from 'classnames'
import { type ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

type Props = {
  headerSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export function Layout(props: Props) {
  return (
    <div className={classNames('layout', { 'layout--with-sidebar': props.sidebarSlot })}>
      {props.headerSlot}
      {props.sidebarSlot}

      <Outlet />

      <ScrollRestoration />
    </div>
  )
}
