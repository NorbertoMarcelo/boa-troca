import { inject, injectable } from 'tsyringe';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { UserDataValidation } from '@utils/UserDataValidation';
import { AppError } from '@errors/AppError';
import { hash } from 'bcrypt';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userDataValidation = new UserDataValidation();

    const validationName = await userDataValidation.name(data.name);
    if (!validationName) throw new AppError('Invalid Name.');

    const validationEmail = await userDataValidation.email(data.email);
    if (!validationEmail) throw new AppError('Invalid email.');

    const validatePassword = await userDataValidation.password(data.password);
    if (!validatePassword) throw new AppError('Invalid password.');

    const validateCpf = await userDataValidation.cpf(data.cpf);
    if (!validateCpf) throw new AppError('Invalid CPF.');

    const validateCep = await userDataValidation.cep(data.cep);
    if (!validateCep) throw new AppError('Invalid CEP.');

    const emailAlreadyUsed = await this.usersRepository.findByEmail(data.email);
    if (emailAlreadyUsed) throw new AppError('User already exists.');

    const cpfAlreadyUsed = await this.usersRepository.findByCpf(data.cpf);
    if (cpfAlreadyUsed) throw new AppError('User already exists.');

    const passwordHash = await hash(data.password, 8);

    await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      cpf: data.cpf,
      cep: data.cep || null,
    });
  }
}
