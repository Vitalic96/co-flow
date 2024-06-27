import { type ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import logo from './logo.png'
import './FormLayout.scss'

type Props = {
  headerSlot?: ReactNode
  footerSlot?: ReactNode
}

export function FormLayout(props: Props) {
  return (
    <>
      <div className='form-layout'>
        <div className='form-layout__form'>
          <Outlet />
        </div>
        <div className='form-layout__logo'>
          <img src={logo} alt='' />
        </div>
      </div>

      <ScrollRestoration />
    </>
  )
}
