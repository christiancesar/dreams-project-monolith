import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO";
import { Flight } from "../../entities/FlightEntity";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

@injectable()
export class CreateFlightService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {
  }

  async execute({ itineraries, price, userId, isPackage }: CreateFlightRequestDTO): Promise<Flight> {
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
