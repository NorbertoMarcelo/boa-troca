import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAdUseCase } from '@modules/ads/useCases/UpdateAdUseCase';

export class UpdateAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description } = request.body;

    const updateAdUseCase = container.resolve(UpdateAdUseCase);

    await updateAdUseCase.execute({ id, title, description });

    return response.status(200).send();
  }
}
