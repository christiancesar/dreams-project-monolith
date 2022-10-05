import ObjectID from "bson-objectid";
import AppError from "../../../../errors/AppError";
import { UsersRepository } from "../../../users/repositories/implementations/UsersRepository";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

type FlightRequest = {
  itineraries: string;
  price: string;
  userId: string;
  isPackage: boolean;
}

export default class CreateFlightService {
  private flightsRepository: FlightsRepository;
  private userRepository: UsersRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository();
    this.userRepository = new UsersRepository();
  }

  async execute({ itineraries, price, userId, isPackage }: FlightRequest): Promise<Flight> {
    if (!ObjectID.isValid(userId)){
      throw new AppError("Invalid id or empty!")
    }

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new AppError("Sorry, but user not exist.");
    }

    if (!itineraries || !price) {
      throw new AppError("Itineraries and price are not empty!");
    }

    const flight = await this.flightsRepository.create({
      itineraries,
      price,
      userId,
      isPackage
    });

    return flight;
  }
}
