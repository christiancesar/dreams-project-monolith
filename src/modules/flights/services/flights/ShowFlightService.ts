import ObjectID from "bson-objectid";
import { AppError } from "../../../../errors/AppError";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

type ShowFlightRequest = {
  flightId: string
}

export class ShowFlightService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
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
