import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTradeUseCase } from '../useCases/CreateTradeUseCase';

export class CreateTradeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ad, advertiser, customer } = request.body;

    const createTradeUseCase = container.resolve(CreateTradeUseCase);

    await createTradeUseCase.execute({
      ad,
      advertiser,
      customer,
    });

    return response.status(201).send();
  }
}
