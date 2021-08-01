import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReadUserUseCase } from '@modules/accounts/useCases/ReadUserUseCase';

export class ReadUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readCarUseCase = container.resolve(ReadUserUseCase);

    await readCarUseCase.execute(id);

    return response.status(201).send();
  }
}
