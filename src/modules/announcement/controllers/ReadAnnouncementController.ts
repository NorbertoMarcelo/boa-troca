import { ReadAnnouncementUseCase } from '@modules/announcement/useCases/ReadAnnouncementUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ReadAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readAdUseCase = container.resolve(ReadAnnouncementUseCase);

    const ad = await readAdUseCase.execute(id);

    return response.status(201).json(ad);
  }
}
