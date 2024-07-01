import { baseApi, PRODUCT_TAG } from 'shared/api'
import { productRoutes } from './product.routes'
import { Product } from '../model/product.model'
import { ProductDto } from '../dto/product.dto'
import { ProductDetailsDto } from '../dto/product-details.dto'
import { productMapper } from '../mapper/product.mapper'
import { productDetailsMapper } from '../mapper/product-details.mapper'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-post.dto'

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<Product[], void>({
      query: () => ({ url: productRoutes.FIND_PRODUCT }),
      transformResponse: (response: ProductDto[]) => response.map(productMapper),
      providesTags: (result, error, arg) => {
        const ids = result?.map((product) => ({ type: PRODUCT_TAG, id: product.productId } as const))
        return [PRODUCT_TAG, ...(ids ?? [])]
      },
    }),
    productDetails: builder.query<ProductDetailsDto, { productId: string }>({
      query: ({ productId }) => ({ url: productRoutes.FIND_PRODUCT_BY_ID(productId) }),
      transformResponse: productDetailsMapper,
      providesTags: (result, error, arg) => [{ type: PRODUCT_TAG, id: arg.productId }],
    }),
    createProduct: builder.mutation<{ productId: string }, CreateProductDto>({
      query: ({ body }) => ({ url: productRoutes.CREATE_POST, method: 'POST', body }),
      invalidatesTags: [PRODUCT_TAG],
    }),
    updateProduct: builder.mutation<void, { productId: string } & UpdateProductDto>({
      query: ({ productId, body }) => ({ url: productRoutes.UPDATE_PRODUCT(productId), method: 'PATCH', body }),
      invalidatesTags: (result, error, arg) => [{ type: PRODUCT_TAG, id: arg.productId }],
    }),
    deleteProduct: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({ url: productRoutes.DELETE_POST(productId), method: 'DELETE' }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
})

export const {
  useProductsQuery,
  useProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
