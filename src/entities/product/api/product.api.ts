import { baseApi, PRODUCT_TAG } from 'shared/api'
import { productRoutes } from './product.routes'
import { Product } from '../model/product.model'
import { ProductDto } from '../dto/product.dto'
import { ProductDetailsDto } from './product-details.dto'
import { productMapper } from '../mapper/product.mapper'
import { productDetailsMapper } from '../mapper/product-details.mapper'

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<Product[], void>({
      query: () => ({ url: productRoutes.FIND_PRODUCT }),
      transformResponse: (response: ProductDto[]) => response.map(productMapper),
      providesTags: (result, error, arg) => {
        const ids = result?.map((product) => ({ type: PRODUCT_TAG, id: product.id } as const))
        return [PRODUCT_TAG, ...(ids ?? [])]
      },
    }),

    productDetails: builder.query<ProductDetailsDto, { slug: string }>({
      query: ({ slug }) => ({ url: productRoutes.FIND_PRODUCT_BY_ID(slug) }),
      transformResponse: productDetailsMapper,
      providesTags: (result, error, arg) => [{ type: PRODUCT_TAG, id: arg.slug }],
    }),
  }),
})

export const { useProductsQuery, useProductDetailsQuery } = productApi
