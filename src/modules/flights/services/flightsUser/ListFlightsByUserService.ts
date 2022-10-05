import ObjectID from "bson-objectid";
import AppError from "../../../../errors/AppError";
import { UsersRepository } from "../../../users/repositories/implementations/UsersRepository";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

type FlightRequest = {
  userId: string
}

export default class ListFlightsByUserService {
  private flightsRepository: FlightsRepository;
  private userRepository: UsersRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
    this.userRepository = new UsersRepository();
  }

  async execute({ userId }: FlightRequest): Promise<Flight[]> {
    if (!ObjectID.isValid(userId)){
      throw new AppError("Invalid id")
    }

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new AppError("Sorry, but user not exist.");
    }

    const flights = await this.flightsRepository.findByUserId(userId);

    return flights;
  }
}
