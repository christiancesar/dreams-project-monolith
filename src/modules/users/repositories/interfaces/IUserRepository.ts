import { ICreateUserDTO } from "../../dtos/CreateUserDTO"
import { IUpdateUserDTO } from "../../dtos/UpdateUserDTO"
import { User } from "../../entities/UserEntity"

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: IUpdateUserDTO): Promise<User>
  deleteUser(userId: string): Promise<User>
}
