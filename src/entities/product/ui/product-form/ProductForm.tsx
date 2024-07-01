import { InputForm } from 'shared/ui'
import { ReactNode } from 'react'
import { UploadImageForm } from 'shared/ui'

type props = {
  actionsSlot?: ReactNode
}

export const ProductForm = (props: props) => {
  const { actionsSlot } = props

  return (
    <>
      <div className='col-lg-5 col-12'>
        <UploadImageForm name='image' />
      </div>
      <div className='col-lg-7 col-12'>
        <InputForm type='text' name='title' label='Title' />
        <InputForm name='text' label='Description' />
        <div className='row'>
          <div className='col-lg-6 col-12'>
            <InputForm type='text' name='price' label='Price' />
          </div>
          <div className='col-lg-6 col-12'>
            <InputForm type='text' name='quantity' label='Quantity' />
          </div>
        </div>
      </div>
      <div className='col-12'>{actionsSlot}</div>
    </>
  )
}
