import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { EndTradeUseCase } from '../useCases/EndTradeUseCase';

export class EndTradeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, status } = request.body;

    const endTradeUseCase = container.resolve(EndTradeUseCase);

    await endTradeUseCase.execute({ id, status });

    return response.status(200).send();
  }
}
