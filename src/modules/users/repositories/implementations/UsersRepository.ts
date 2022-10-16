import { prisma } from "../../../../../prisma";
import { CreateUserDTO } from "../../dtos/CreateUserRequestDTO";
import { UpdateUserDTO } from "../../dtos/UpdateUserRequestDTO";
import { User } from "../../entities/UserEntity";
import { IUsersRepository } from "../interfaces/IUserRepository";


export class UsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    return user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async updateUser({ age, birthday, email, firstName, id, lastName }: UpdateUserDTO): Promise<User> {
    const userUpdate = await prisma.user.update({
      where: {
        id: id
      },
      data: { age, birthday, email, firstName, lastName }
    })
    return userUpdate
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id: userId } })
    return user
  }
}
