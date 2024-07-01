import { useProductsQuery } from 'entities/product/api/product.api'
import { AiFillPlusCircle } from 'react-icons/ai'
import { PATH_PAGE } from 'shared/lib'
import { Link } from 'react-router-dom'
import { ProductCard } from 'entities/product'

export const ProductListPage = () => {
  const { data: products = [], isLoading } = useProductsQuery()

  const hasProducts = !isLoading && Boolean(products.length)

  return (
    <section className='section'>
      <div className='container-fluid'>
        <h2 className='section-title h3'>Digital product</h2>
        {!hasProducts ? (
          <div className='text-center'>
            <h3 className='mb-30'>Nothing found</h3>
          </div>
        ) : (
          <div className='items row row--m-10'>
            {products.map((product) => {
              return <ProductCard key={product.productId} product={product} />
            })}
          </div>
        )}
        <Link to={PATH_PAGE.products.createProduct} className='add-product-button mt-25'>
          <AiFillPlusCircle />
          Add product
        </Link>
      </div>
    </section>
  )
}
