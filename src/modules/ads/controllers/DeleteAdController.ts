import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAdUseCase } from '@modules/ads/useCases/DeleteAdUseCase';

export class DeleteAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdUseCase = container.resolve(DeleteAdUseCase);

    await deleteAdUseCase.execute(id);

    return response.status(200).send();
  }
}
