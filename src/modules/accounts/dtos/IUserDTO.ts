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
  update(id: string): Promise<User>;
  delete(id: string): Promise<User>;
}

export interface IRequest {
  email: string;
  password: string;
}

export interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
