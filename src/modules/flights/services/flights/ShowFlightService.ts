import ObjectID from "bson-objectid";
import AppError from "../../../../errors/AppError";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

interface IFlight {
  flightId: string
}

export default class CreateFlightService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ flightId }: IFlight): Promise<Flight | null> {
    if (!ObjectID.isValid(flightId)){
      throw new AppError("Invalid id")
    }

    const flight = await this.flightsRepository.findByFlightId(flightId);

    if (!flight) {
      throw new AppError('Flight not found!');
    }

    return flight;
  }
}
