import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { AppError } from '@errors/AppError';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found');

    console.log(user);

    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new AppError('Could not run', 500);
    }
  }
}
