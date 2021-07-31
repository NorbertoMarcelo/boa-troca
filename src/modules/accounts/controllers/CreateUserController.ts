import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, cep } = request.body;

    const createCarUseCase = container.resolve(CreateUserUseCase);

    await createCarUseCase.execute({
      name,
      email,
      password,
      cpf,
      cep,
    });

    return response.status(201).send();
  }
}
