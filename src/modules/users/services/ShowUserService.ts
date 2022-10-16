import { injectable, inject } from 'tsyringe';
import ObjectID from "bson-objectid";
import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

type ShowUserRequest = {
  userId: string
}

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute({ userId }: ShowUserRequest): Promise<User> {

    if (!ObjectID.isValid(userId)){
      throw new AppError("Invalid id")
    }

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new AppError("Sorry, but user not exist.");
    }

    return user
  }
}
