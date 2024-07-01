export {
  productApi,
  useCreateProductMutation,
  useDeleteProductMutation,
  useProductDetailsQuery,
  useProductsQuery,
  useUpdateProductMutation,
} from './api/product.api'
export { productRoutes } from './api/product.routes'
export { type Product, type ProductId } from './model/product.model'
export { productImageValidation } from './model/product-image.validation'
export { ProductCard } from './ui/product-card/ProductCard'
export { ProductForm } from './ui/product-form/ProductForm'
