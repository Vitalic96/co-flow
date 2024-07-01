export const PATH_PAGE = {
  root: '/',
  products: {
    root: '/products',
    product: (productId: string) => `/products/${productId}`,
    createProduct: `/products/create`,
    updateProduct: (id: string) => `/cabinet/products/${id}/update`,
  },
  register: '/register',
  login: '/login',
  404: '/404',
  error: '/error',
}
