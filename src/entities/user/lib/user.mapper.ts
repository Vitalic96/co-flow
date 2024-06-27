import { type UserDto } from '../dto/user.dto'
import { type User } from '../model/user.model'

export const userMapper = (dto: UserDto): User => {
  return {
    id: dto.id,
    email: dto.email,
  }
}
