import { inject, injectable } from 'tsyringe';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';

@injectable()
export class CreateAdUseCase {
  constructor(
    @inject('AdsRepository')
    private adsRepository: IAdsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(title: string, description: string, id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    await this.adsRepository.create({
      title: title,
      description: description,
      user: user,
    });
  }
}
