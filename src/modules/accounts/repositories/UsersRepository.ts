import { getRepository, Repository } from 'typeorm';
import { User } from '@modules/accounts/entities/User';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';

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

  async create(informations: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name: informations.name,
      email: informations.email,
      password: informations.password,
      cpf: informations.cpf,
      cep: informations.cep || null,
    });

    await this.repository.save(user);

    return user;
  }

  async update(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
