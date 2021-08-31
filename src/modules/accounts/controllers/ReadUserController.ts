import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReadUserUseCase } from '@modules/accounts/useCases/ReadUserUseCase';

export class ReadUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readCarUseCase = container.resolve(ReadUserUseCase);

    const user = await readCarUseCase.execute(id);

    return response.status(200).json(user);
  }
}
