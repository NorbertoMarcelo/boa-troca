import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/entities/User';
import { AppError } from '@errors/AppError';
import { UserDataValidation } from '@utils/UserDataValidation';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(informations: ICreateUserDTO): Promise<void> {
    const validation = new UserDataValidation();

    await validation.name(informations.name);
    await validation.email(informations.email);
    await validation.password(informations.password);
    await validation.CPF(informations.cpf);
    await validation.CEP(informations.cep);

    const emailIsAlreadyInUse = await this.usersRepository.findByEmail(
      informations.email
    );

    if (emailIsAlreadyInUse) {
      throw new AppError('User already exists');
    }

    const cpfIsAlreadyInUse = await this.usersRepository.findByCpf(
      informations.cpf
    );

    if (cpfIsAlreadyInUse) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(informations.password, 8);

    const user = await this.usersRepository.create({
      name: informations.name,
      email: informations.email,
      password: passwordHash,
      cpf: informations.cpf,
      cep: informations.cep || null,
    });
  }
}
