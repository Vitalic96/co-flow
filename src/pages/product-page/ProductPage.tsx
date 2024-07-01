import { useProductDetailsQuery } from 'entities/product'
import { useParams } from 'react-router-dom'
import { errorHandler } from 'shared/lib'
import { Preloader } from 'shared/ui'

export const ProductPage = () => {
  const { productId } = useParams() as { productId: string }

  const productState = useProductDetailsQuery({ productId })

  if (productState.isLoading) return <Preloader />

  if (!productState.isSuccess) return errorHandler(productState.error)

  const { data: product } = productState

  return (
    <section className='section'>
      <div className='container-fluid'>
        <h2 className='section-title h3'>{product.title}</h2>
        <p>{product.text}</p>
      </div>
    </section>
  )
}
