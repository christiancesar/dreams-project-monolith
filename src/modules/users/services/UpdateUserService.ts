import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import ObjectID from "bson-objectid";
import { AppError } from "../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/interfaces/IUserRepository";
import { UpdateUserRequestDTO } from "../dtos/UpdateUserRequestDTO";

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    id,
    firstName,
    lastName,
    birthday,
    age,
    email
  }: UpdateUserRequestDTO): Promise<User> {

    if (!ObjectID.isValid(id)) {
      throw new AppError("Invalid id")
    }

    const userAlreadyExist = await this.userRepository.findByUserId(id)

    if (!userAlreadyExist) {
      throw new AppError("Sorry, but user not exist.");
    }

    const user = this.userRepository.updateUser({
      id,
      firstName,
      lastName,
      birthday,
      age,
      email
    })

    return user
  }
}
