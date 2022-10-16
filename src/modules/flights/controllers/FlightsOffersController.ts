import { Request, Response } from "express";
import { container } from "tsyringe";
import { FlightOfferSearchDTO } from "../../../shared/containers/providers/FlightProvider/dtos/FlightOffersSearchDTO";
import { FlightOfferSearchService } from "../services/flightOffers/FlightOfferSearchService";

export class FlightsOffersController {


  async index(request: Request, response: Response): Promise<Response> {

    const {
      adults,
      departureDate,
      destinationLocationCode,
      originLocationCode,
      travelClass,
      children,
      infants,
      returnDate
    } = request.body as FlightOfferSearchDTO

    const flightOfferSearchService = container.resolve(FlightOfferSearchService);

    const flightOffers = await flightOfferSearchService.execute({
      adults,
      departureDate,
      destinationLocationCode,
      originLocationCode,
      travelClass,
      children,
      infants,
      returnDate
    })

    return response.json(flightOffers?.data)
  }
}
