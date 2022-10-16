import { injectable, inject } from 'tsyringe';
import { User } from "../entities/UserEntity";
import { IUsersRepository } from '../repositories/interfaces/IUserRepository';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;

  }
}
