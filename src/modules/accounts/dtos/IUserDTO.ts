import { User } from '@modules/accounts/entities/User';

export interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  cep?: string;
}

export interface IUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  cep?: string;
}

export interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IAuthenticateRequest {
  email: string;
  password: string;
}

export interface IAuthenticateResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface IReadUser {
  name: string;
  email: string;
  cep: string;
}
