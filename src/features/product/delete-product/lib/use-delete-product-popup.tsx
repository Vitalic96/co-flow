import { useDeleteProductMutation } from 'entities/product'
import { notifySuccess, notifyUnknown } from 'shared/lib'
import React from 'react'
import { useConfirmPopup } from 'shared/model'

export const useDeleteProductPopup = (params: { productId: string }, onComplete?: () => void) => {
  const [deleteProduct] = useDeleteProductMutation()
  const confirmRemoveModal = useConfirmPopup()

  return (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    confirmRemoveModal.show({
      title: 'Are you really want remove product?',
      onConfirm: async () => {
        try {
          await deleteProduct(params).unwrap()
          onComplete && onComplete()
          notifySuccess(`You have successfully deleted product`)
        } catch (e) {
          notifyUnknown(e)
        } finally {
          confirmRemoveModal.remove()
        }
      },
    })
  }
}
