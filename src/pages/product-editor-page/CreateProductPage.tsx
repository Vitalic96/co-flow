import { useProductDetailsQuery } from 'entities/product'
import { CreateProductForm } from 'features/product/create-product'
import { UpdateProductForm } from 'features/product/update-product'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PATH_PAGE, errorHandler } from 'shared/lib'
import { Preloader } from 'shared/ui'

export const UpdateProductPage = () => {
  const { productId } = useParams() as { productId: string }
  const { data: product, isSuccess, isLoading, error } = useProductDetailsQuery({ productId })

  const navigate = useNavigate()

  const defaultValues = useMemo(
    () => ({ ...product, image: '' as unknown as undefined, imagePreview: product?.image }),
    [product],
  )

  if (isLoading) return <Preloader />
  if (!isSuccess) return errorHandler(error)

  const onComplete = () => {
    navigate(-1)
  }

  return (
    <section className='section'>
      <div className='container'>
        <h2 className='section-title h3'>Edit Product</h2>
        <UpdateProductForm onComplete={onComplete} productId={productId} defaultValues={defaultValues} />
      </div>
    </section>
  )
}

export const CreateProductPage = () => {
  const navigate = useNavigate()

  const onComplete = (productId: string) => {
    navigate(PATH_PAGE.products.product(productId))
  }

  return (
    <section className='section'>
      <div className='container-fluid'>
        <h2 className='section-title h3'>New Product №1</h2>
        <CreateProductForm onComplete={onComplete} />
      </div>
    </section>
  )
}
