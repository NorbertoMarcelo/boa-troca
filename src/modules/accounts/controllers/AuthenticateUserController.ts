import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateCarUseCase = container.resolve(AuthenticateUserUseCase);

    await authenticateCarUseCase.execute(email, password);

    return response.status(201).send();
  }
}
