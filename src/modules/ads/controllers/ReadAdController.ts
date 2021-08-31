import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReadAdUseCase } from '@modules/ads/useCases/ReadAdUseCase';

export class ReadAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readAdUseCase = container.resolve(ReadAdUseCase);

    const ad = await readAdUseCase.execute(id);

    return response.status(200).json(ad);
  }
}
