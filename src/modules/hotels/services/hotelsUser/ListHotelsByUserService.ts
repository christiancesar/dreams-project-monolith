import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

type HotelRequest = {
  userId: string;
}

type HotelResponse = {
  id: string;
  hotel: string;
  offers: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class ListHotelsByUserService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {  }

  async execute({ userId }: HotelRequest): Promise<HotelResponse[]> {
    if (!ObjectID.isValid(userId)) {
      throw new AppError("Invalid id")
    }

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new AppError("Sorry, but user not exist.");
    }

    const hotels = await this.hotelsRepository.findHotelsByUserId(userId);

    return hotels
  }
}
