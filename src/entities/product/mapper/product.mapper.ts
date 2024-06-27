import { ProductDto } from '../dto/product.dto'
import { Product } from '../model/product.model'

export const productMapper = (dto: ProductDto): Product => {
  return {
    id: dto.id,
    title: dto.title,
    text: dto.text,
    price: dto.price,
    quantity: dto.quantity,
  }
}
