import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../../users/repositories/implementations/UsersRepository";
import { Flight } from "../../entities/FlightEntity";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

type CreateFlightRequest = {
  itineraries: string;
  price: string;
  userId: string;
  isPackage: boolean;
}

@injectable()
export class CreateFlightService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: FlightsRepository,

    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) {
  }

  async execute({ itineraries, price, userId, isPackage }: CreateFlightRequest): Promise<Flight> {
    if (!ObjectID.isValid(userId)) {
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
