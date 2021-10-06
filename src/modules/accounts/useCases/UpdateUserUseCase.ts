import { inject, injectable } from 'tsyringe';
import {
  IUpdateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { UserDataValidation } from '@utils/UserDataValidation';
import { AppError } from '@errors/AppError';
import { hash } from 'bcrypt';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IUpdateUserDTO): Promise<void> {
    const userDataValidation = new UserDataValidation();

    const validationName = await userDataValidation.name(data.name);
    if (!validationName) throw new AppError('Invalid Name.');

    const validationEmail = await userDataValidation.email(data.email);
    if (!validationEmail) throw new AppError('Invalid email.');

    const validatePassword = await userDataValidation.password(data.password);
    if (!validatePassword) throw new AppError('Invalid password.');

    const validateCep = await userDataValidation.cep(data.cep);
    if (!validateCep) throw new AppError('Invalid CEP.');

    const passwordHash = await hash(data.password, 8);

    await this.usersRepository.update({
      id: data.id,
      name: data.name,
      email: data.email,
      password: passwordHash,
      phone: data.phone,
      cep: data.cep || null,
    });
  }
}
