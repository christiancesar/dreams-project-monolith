import { Request, Response } from "express";
import { FlightOfferSearchRequest } from "../../../@types/amadeus/flights/FlightOfferSearchRequest";
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
    } = request.body as Omit<FlightOfferSearchRequest, 'max' | 'currencyCode'>

    const flightOfferSearchService = new FlightOfferSearchService();

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
