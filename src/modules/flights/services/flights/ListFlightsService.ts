import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

export default class ListFlightsService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository();
  }

  async execute(): Promise<Flight[]> {
    const flights = await this.flightsRepository.findAll();

    return flights;
  }
}
