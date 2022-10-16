import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateHotelService } from "../services/hotels/CreateHotelService";
import { ListHotelsService } from "../services/hotels/ListHotelsService";
import { ShowHotelService } from "../services/hotels/ShowHotelService";

export class HotelsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { hotel, offers, userId, isPackage } = request.body
    const createHotelService = container.resolve(CreateHotelService);
    const hotelCreated = await createHotelService.execute({ hotel, offers, userId, isPackage })
    return response.json(hotelCreated)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { hotelId } = request.params
    const showHotelService = container.resolve(ShowHotelService);
    const hotels = await showHotelService.execute({ hotelId })
    return response.json(hotels)
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listHotelsService = container.resolve(ListHotelsService);
    const hotels = await listHotelsService.execute();
    return response.json(hotels)
  }
}
