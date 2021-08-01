import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from '@modules/accounts/useCases/DeleteUserUseCase';

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarUseCase = container.resolve(DeleteUserUseCase);

    await deleteCarUseCase.execute(id);

    return response.status(201).send();
  }
}
