import { Request, Response } from "express";
import { container } from "tsyringe";
import { HotelOffersSearch } from "../dtos/HotelOffersSearch";
import { HotelOfferSearchService } from "../services/hotelOffers/HotelOffersSearchService";


export class HotelOffersController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      adults,
      checkInDate,
      checkOutDate,
      cityCode,
      roomQuantity
    } = request.body as HotelOffersSearch;

    const hotelOfferSearchService = container.resolve(HotelOfferSearchService);

    const hotels = await hotelOfferSearchService.execute({
      adults,
      checkInDate,
      checkOutDate,
      cityCode,
      roomQuantity
    });

    return response.json(hotels.data)
  }
}
