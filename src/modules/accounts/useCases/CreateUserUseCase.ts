import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/entities/User';
import { AppError } from '@errors/AppError';
import { brasilApi } from '@apis/brasilApi';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(informations: ICreateUserDTO): Promise<User> {
    const userAlreadyExistsEmail = await this.usersRepository.findByEmail(
      informations.email
    );

    if (userAlreadyExistsEmail) {
      throw new AppError('User already exists');
    }

    const userAlreadyExistsCPF = await this.usersRepository.findByCpf(
      informations.cpf
    );

    if (userAlreadyExistsCPF) {
      throw new AppError('User already exists');
    }

    const cpfIsValid = cpf.isValid(informations.cpf);

    if (!cpfIsValid) {
      throw new AppError('User data is not correct');
    }

    const cepIsValid = await brasilApi
      .get(`/cep/v1/${informations.cep}`)
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else {
          throw new AppError('CEP is invalid');
        }
      });

    const passwordHash = await hash(informations.password, 8);

    const user = await this.usersRepository.create({
      name: informations.name,
      email: informations.email,
      password: passwordHash,
      cpf: informations.cpf,
      cep: null || informations.cep,
    });

    return user;
  }
}
