import { Form } from 'shared/ui'
import { DefaultValues } from 'react-hook-form'
import { useUpdateProductMutation } from 'entities/product'
import { UpdateProductFormSchema, updateProductFormSchema } from '../model/update-product-form.schema'
import { notifySuccess, objectToFormData } from 'shared/lib'
import { ProductForm } from 'entities/product'
import { ProductEditorAction } from 'features/product/create-product/ui/ProductEditorAction'

type Props = {
  productId: string
  onComplete: () => void
  defaultValues?: DefaultValues<UpdateProductFormSchema>
}

export const UpdateProductForm = (props: Props) => {
  const { onComplete, defaultValues, productId } = props
  const [updateProduct] = useUpdateProductMutation()

  const onSubmit = async (data: UpdateProductFormSchema) => {
    const body = objectToFormData(data)

    await updateProduct({ body, productId }).unwrap()
    notifySuccess('You have successfully updated post')
    onComplete()
  }

  return (
    <Form
      validationSchema={updateProductFormSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      className='row'
      notResetAfterSubmit
    >
      <ProductForm actionsSlot={<ProductEditorAction productId={productId} />} />
    </Form>
  )
}
