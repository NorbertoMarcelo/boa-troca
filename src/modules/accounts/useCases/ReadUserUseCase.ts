import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { AppError } from '@errors/AppError';

interface IReadUser {
  name: string;
  email: string;
  cep: string;
}

@injectable()
export class ReadUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IReadUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found');

    const readUser: IReadUser = {
      name: user.name,
      email: user.email,
      cep: user.cep || null,
    };

    return readUser;
  }
}
