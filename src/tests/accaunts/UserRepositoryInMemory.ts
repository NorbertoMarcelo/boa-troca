import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/entities/User';

export class UsersRepositoryInMemory implements IUsersRepository {
  user: User[] = [];

  async findById(id: string): Promise<User> {
    return this.user.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.user.find((user) => user.email === email);
  }

  async findByCpf(cpf: string): Promise<User> {
    return this.user.find((user) => user.cpf === cpf);
  }

  async create(informations: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name: informations.name,
      email: informations.email,
      password: informations.password,
      cpf: informations.cpf,
      cep: null || informations.cep,
    });

    this.user.push(user);

    return user;
  }
}
