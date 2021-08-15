import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAnnouncementUseCase } from '../useCases/CreateAnnouncementUseCase';

export class CreateAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createAdUseCase = container.resolve(CreateAnnouncementUseCase);

    await createAdUseCase.execute({
      title,
      description,
    });

    return response.status(201).send();
  }
}
