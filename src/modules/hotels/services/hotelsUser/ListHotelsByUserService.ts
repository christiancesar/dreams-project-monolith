import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";
import ObjectID from "bson-objectid";
import { UsersRepository } from "../../../users/repositories/implementations/UsersRepository";
import AppError from "../../../../errors/AppError";

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

export default class ListHotelsByUserService {

  private hotelsRepository: HotelsRepository;
  private userRepository: UsersRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository();
    this.userRepository = new UsersRepository();
  }

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
