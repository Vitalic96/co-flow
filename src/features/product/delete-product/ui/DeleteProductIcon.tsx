import { ButtonProps } from 'shared/ui'
import { ButtonHTMLAttributes } from 'react'
import { useDeleteProductPopup } from '../lib/use-delete-product-popup'
import { TbTrashFilled } from 'react-icons/tb'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string
  onComplete?: () => void
}
type Props = IProps & ButtonProps

export const DeleteProductIcon = (props: Props) => {
  const { productId, onComplete, ...rest } = props
  const onDelete = useDeleteProductPopup({ productId }, onComplete)

  return (
    <button onClick={onDelete} {...rest}>
      <TbTrashFilled />
    </button>
  )
}
