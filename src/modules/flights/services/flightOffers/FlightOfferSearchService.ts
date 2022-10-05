import { FlightOfferSearchRequest } from "../../../../@types/amadeus/flights/FlightOfferSearchRequest";
import { FlightOfferSearchResponse } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { TravelClass } from "../../../../@types/amadeus/flights/TravelClass";
import { amadeus } from "../../../../providers/amadeus/amadeusApi";

export default class FlightOfferSearchService {

  public async execute({
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    travelClass,
    children,
    infants,
    returnDate
  }: Omit<FlightOfferSearchRequest, 'max' | 'currencyCode'>): Promise<FlightOfferSearchResponse> {
      const findTravelClass = TravelClass[travelClass]
      const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        children,
        infants,
        travelClass: findTravelClass,
        currencyCode: 'BRL',
        max: 10
      } as FlightOfferSearchRequest) as FlightOfferSearchResponse

      return flightOffersResponse

  }
}
