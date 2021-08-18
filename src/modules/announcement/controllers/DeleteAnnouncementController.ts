import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAnnouncementUseCase } from '../useCases/DeleteAnnouncementUseCase';

export class DeleteAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdUseCase = container.resolve(DeleteAnnouncementUseCase);

    await deleteAdUseCase.execute(id);

    return response.status(204).send();
  }
}
