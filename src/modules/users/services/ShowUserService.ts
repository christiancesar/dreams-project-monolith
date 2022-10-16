import ObjectID from "bson-objectid";
import { inject, injectable } from 'tsyringe';
import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/UserEntity";
import { IUsersRepository } from '../repositories/interfaces/IUserRepository';

type ShowUserRequest = {
  userId: string
}

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
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
