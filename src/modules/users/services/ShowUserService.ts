import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import ObjectID from "bson-objectid";
import AppError from "../../../errors/AppError";

type ShowUserRequest = {
  userId: string
}

export class ShowUserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

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
