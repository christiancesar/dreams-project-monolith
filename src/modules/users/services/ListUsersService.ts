import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

export class ListUsersService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;

  }
}
