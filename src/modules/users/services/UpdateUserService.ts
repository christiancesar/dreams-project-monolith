import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import ObjectID from "bson-objectid";
import { AppError } from "../../../errors/AppError";

type UpdateUserRequest = {
  id: string
  firstName: string;
  lastName: string;
  birthday: string;
  age: number;
  email: string;
}

export class UpdateUserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository()
  }

  async execute({
    id,
    firstName,
    lastName,
    birthday,
    age,
    email
  }: UpdateUserRequest): Promise<User> {

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
