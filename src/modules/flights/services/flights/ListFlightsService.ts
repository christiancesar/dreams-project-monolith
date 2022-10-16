import { inject, injectable } from "tsyringe";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

@injectable()
export class ListFlightsService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: FlightsRepository
  ) {
  }

  async execute(): Promise<Flight[]> {
    const flights = await this.flightsRepository.findAll();

    return flights;
  }
}
