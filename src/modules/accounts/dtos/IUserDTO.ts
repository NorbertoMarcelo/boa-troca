import { User } from '@modules/accounts/entities/User';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  id?: string;
  cep?: string;
}

export interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  create(informations: ICreateUserDTO): Promise<User>;
}
