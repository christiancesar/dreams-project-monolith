import ObjectID from "bson-objectid";
import { inject, injectable } from 'tsyringe';
import { AppError } from "../../../shared/errors/AppError";
import { ShowUserRequestDTO } from "../dtos/ShowUserRequestDTO";
import { User } from "../entities/UserEntity";
import { IUsersRepository } from '../repositories/interfaces/IUserRepository';



@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({ userId }: ShowUserRequestDTO): Promise<User> {

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
