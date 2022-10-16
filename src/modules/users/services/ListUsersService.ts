import { injectable, inject } from 'tsyringe';
import { User } from "../entities/UserEntity";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;

  }
}
