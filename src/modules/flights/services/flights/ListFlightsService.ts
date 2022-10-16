import { inject, injectable } from "tsyringe";
import { Flight } from "../../entities/FlightEntity";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

@injectable()
export class ListFlightsService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository
  ) {
  }

  async execute(): Promise<Flight[]> {
    const flights = await this.flightsRepository.findAll();

    return flights;
  }
}
