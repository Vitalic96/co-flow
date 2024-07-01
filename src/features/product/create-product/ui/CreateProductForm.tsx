import { Form } from 'shared/ui'
import { useCreateProductMutation } from 'entities/product'
import { CreateProductFormSchema, createProductFormSchema } from '../model/create-post-form.schema'
import { notifySuccess, objectToFormData } from 'shared/lib'
import { ProductEditorAction } from './ProductEditorAction'
import { ProductForm } from 'entities/product'

type CreateProductFormProps = {
  onComplete?: (slug: string) => void
}

export const CreateProductForm = (props: CreateProductFormProps) => {
  const { onComplete } = props

  const [createProduct] = useCreateProductMutation()

  const onSubmit = async (data: CreateProductFormSchema) => {
    const body = objectToFormData(data)

    const response = await createProduct({ body }).unwrap()
    onComplete && onComplete(response.productId)
    notifySuccess('You have successfully created post')
  }

  return (
    <Form validationSchema={createProductFormSchema} onSubmit={onSubmit} className='row flex-start'>
      <ProductForm actionsSlot={<ProductEditorAction />} />
    </Form>
  )
}
