import { ProductDetailsDto } from '../api/product-details.dto'
import { productMapper } from './product.mapper'

export const productDetailsMapper = (dto: ProductDetailsDto): ProductDetailsDto => productMapper(dto)
