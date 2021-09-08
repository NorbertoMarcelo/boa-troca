import {
  ICreateUserDTO,
  IUpdateUserDTO,
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

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      avatar: data.avatar,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cpf: data.cpf,
      cep: data.cep,
    });

    this.user.push(user);
  }

  async update(data: IUpdateUserDTO): Promise<void> {
    this.user.forEach((user) => {
      if (user.id === data.id) {
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.cep = null || data.cep;
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.user.forEach((user) => {
      if (user.id === id) {
        this.user.splice(this.user.indexOf(user), 1);
      }
    });
  }
}
