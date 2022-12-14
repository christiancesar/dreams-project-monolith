import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { ListFlightsByUserRequestDTO } from "../../dtos/ListFlightByUserRequestDTO";
import { Flight } from "../../entities/FlightEntity";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

@injectable()
export class ListFlightsByUserService {

  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {  }

  async execute({ userId }: ListFlightsByUserRequestDTO): Promise<Flight[]> {
    if (!ObjectID.isValid(userId)) {
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
