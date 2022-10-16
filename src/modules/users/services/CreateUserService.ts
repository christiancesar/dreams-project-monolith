import { inject, injectable } from 'tsyringe';
import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/UserEntity";
import { IUsersRepository } from '../repositories/interfaces/IUserRepository';

@injectable()
export class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: CreateUserRequestDTO): Promise<User> {
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
