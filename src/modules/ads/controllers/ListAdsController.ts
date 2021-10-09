import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAdsUseCase } from '@modules/ads/useCases/ListAdsUseCase';

export class ListAdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAdsUseCase = container.resolve(ListAdsUseCase);

    const ads = await listAdsUseCase.execute();

    return response.status(200).json(ads);
  }
}
