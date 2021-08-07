import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { UserDataValidation } from '@utils/UserDataValidation';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, informations: ICreateUserDTO) {
    const validation = new UserDataValidation();

    await validation.name(informations.name);
    await validation.email(informations.email);
    await validation.password(informations.password);
    await validation.CPF(informations.cpf);
    await validation.CEP(informations.cep);

    const passwordHash = await hash(informations.password, 8);

    const user = await this.usersRepository.update(id, {
      name: informations.name,
      email: informations.email,
      password: passwordHash,
      cpf: informations.cpf,
      cep: informations.cep || null,
    });
  }
}
