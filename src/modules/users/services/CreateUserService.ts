import AppError from "../../../errors/AppError";
import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

type IRequestCreateUser = {
  firstName: string;
  lastName: string;
  birthday: string;
  age: number;
  email: string;
}

export class CreateUserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository()
  }

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: IRequestCreateUser): Promise<User>
  {
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
