import React from 'react'
import PreloaderSvg from './img/preloader.svg?react'
import './Preloader.scss'

export const Preloader = () => {
  return (
    <div className='preloader'>
      <PreloaderSvg />
    </div>
  )
}
