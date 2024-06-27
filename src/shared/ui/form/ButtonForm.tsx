import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '../button/Button'
import { useFormContext } from 'react-hook-form'

type Props = {
  children?: ReactNode
} & ButtonProps

export const ButtonForm = (props: Props) => {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext()

  return (
    // disabled={!isDirty}
    <Button {...props} loading={isSubmitting}>
      {props.children}
    </Button>
  )
}
