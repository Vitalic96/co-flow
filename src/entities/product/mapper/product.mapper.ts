import { ProductDto } from '../dto/product.dto'
import { Product } from '../model/product.model'

export const productMapper = (dto: ProductDto): Product => {
  return {
    productId: dto.productId,
    image: dto.image,
    title: dto.title,
    text: dto.text,
    price: dto.price,
    quantity: dto.quantity,
  }
}
