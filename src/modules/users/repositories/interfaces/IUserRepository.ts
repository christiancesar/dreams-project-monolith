import { CreateUserDTO } from "../../dtos/CreateUserRequestDTO"
import { UpdateUserDTO } from "../../dtos/UpdateUserRequestDTO"
import { User } from "../../entities/UserEntity"

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: UpdateUserDTO): Promise<User>
  deleteUser(userId: string): Promise<User>
}
