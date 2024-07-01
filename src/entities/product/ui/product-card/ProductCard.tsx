import { Product } from 'entities/product/model/product.model'
import { DeleteProductIcon } from 'features/product/delete-product'
import { CiEdit } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import './ProductCard.scss'

type Props = {
  product: Product
}

export const ProductCard = (props: Props) => {
  const { product } = props

  const to = PATH_PAGE.products.product(product.productId)

  return (
    <div key={product.productId} className='items__item col-lg-3 col-12 product-card'>
      <div className='product-card__actions'>
        <button>
          <Link to={PATH_PAGE.products.updateProduct(product.productId)}>
            <CiEdit />
          </Link>
        </button>
        <DeleteProductIcon productId={product.productId} />
      </div>
      <div className='product-card__image' style={{ backgroundImage: `url(${product.image})` }}></div>
      <div className='product-card__status'>Draft</div>
      <div className='product-card__content'>
        <h3 className='product-card__title h4'>
          <Link to={to} className='text-link text-white'>
            {product.title}
          </Link>
        </h3>
        <div className='product-card__price'>${product.price}</div>
        <button className='product-card__button'>Buy now</button>
      </div>
    </div>
  )
}
