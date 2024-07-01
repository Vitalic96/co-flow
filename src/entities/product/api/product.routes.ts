export const productRoutes = {
  FIND_PRODUCT: '/products',
  FIND_PRODUCT_BY_ID: (productId: string) => `/products/${productId}`,
  CREATE_POST: `/products/`,
  UPDATE_PRODUCT: (productId: string) => `/products/${productId}`,
  DELETE_POST: (productId: string) => `/products/${productId}`,
}
