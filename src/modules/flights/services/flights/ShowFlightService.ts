import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Flight } from "../../entities/FlightEntity";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

type ShowFlightRequest = {
  flightId: string
}

@injectable()
export class ShowFlightService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository
  ) {
  }

  async execute({ flightId }: ShowFlightRequest): Promise<Flight | null> {
    if (!ObjectID.isValid(flightId)) {
      throw new AppError("Invalid id")
    }

    const flight = await this.flightsRepository.findByFlightId(flightId);

    if (!flight) {
      throw new AppError('Flight not found!');
    }

    return flight;
  }
}
