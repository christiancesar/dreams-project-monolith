import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListHotelsByUserService } from "../services/hotelsUser/ListHotelsByUserService";

export class HotelUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listHotelsByUserService = container.resolve(ListHotelsByUserService);
    const hotels = await listHotelsByUserService.execute({ userId });
    return response.json(hotels)
  }
}

