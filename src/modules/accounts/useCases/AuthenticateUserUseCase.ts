import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  IAuthenticateRequest,
  IAuthenticateResponse,
  IUsersRepository,
} from '@modules/accounts/dtos/IUserDTO';
import { AppError } from '@errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Email or password incorrect.', 401);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('Email or password incorrect.', 401);

    const token = sign({}, 'ce1b008b816ee4a73058a23c64bfb981', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IAuthenticateResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
