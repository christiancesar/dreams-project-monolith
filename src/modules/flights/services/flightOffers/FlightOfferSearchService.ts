import { inject, injectable } from "tsyringe";
import { FlightOfferSearchResponse } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { FlightOfferSearchDTO } from "../../../../shared/containers/providers/FlightProvider/dtos/FlightOffersSearchDTO";
import { IFlightProvider } from "../../../../shared/containers/providers/FlightProvider/interfaces/IFlightProvider";

@injectable()
export class FlightOfferSearchService {
  constructor(
    @inject('FlightProvider')
    private flightProvider: IFlightProvider,
  ) { }

  public async execute({
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    travelClass,
    children,
    infants,
    returnDate
  }: FlightOfferSearchDTO): Promise<FlightOfferSearchResponse> {
    const flightOffersResponse = await this.flightProvider.findFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass
    })

    return flightOffersResponse
  }
}
