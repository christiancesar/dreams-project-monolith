import { injectable, inject } from 'tsyringe';
import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

type CreateUserRequest = {
  firstName: string;
  lastName: string;
  birthday: string;
  age: number;
  email: string;
}

@injectable()
export class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: CreateUserRequest): Promise<User> {
    if (age <= 17) {
      throw new AppError("Age must be greater than 17");
    }
    if ((lastName === '') || (firstName === '')) {
      throw new AppError("First or Last name must be empty");
    }

    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError("User already exists");
    }

    const user = this.userRepository.create({
      firstName,
      lastName,
      birthday,
      age,
      email
    })

    return user
  }
}
