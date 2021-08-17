import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAnnouncementUseCase } from '../useCases/UpdateAnnouncementUseCase';

export class UpdateAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description } = request.body;

    const updateAdUseCase = container.resolve(UpdateAnnouncementUseCase);

    await updateAdUseCase.execute(id, {
      title,
      description,
    });

    return response.status(201).send();
  }
}
