import { getRepository, Repository } from 'typeorm';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ cpf });
    return user;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      avatar: data.avatar,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cpf: data.cpf,
      cep: data.cep,
    });
    await this.repository.save(user);
  }

  async update(data: IUpdateUserDTO): Promise<void> {
    await this.repository.update(data.id, {
      avatar: data.avatar,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cep: data.cep,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
