import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';

export class CreateAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id } = request.user;

    const createAdUseCase = container.resolve(CreateAdUseCase);

    await createAdUseCase.execute(title, description, id);

    return response.status(201).send();
  }
}
