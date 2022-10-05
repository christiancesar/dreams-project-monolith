import ObjectID from "bson-objectid";
import AppError from "../../../../errors/AppError";
import { UsersRepository } from "../../../users/repositories/implementations/UsersRepository";
import HotelsRepository from "../../repositories/implementations/HotelsRepository";

type HotelRequest = {
  userId: string;
  hotel: string;
  offers: string;
  isPackage: boolean;
}

type HotelResponse = {
  id: string;
  hotel: string;
  offers: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class CreateHotelService {

  private hotelsRepository: HotelsRepository;
  private userRepository: UsersRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository();
    this.userRepository = new UsersRepository();
  }

  async execute({ hotel, offers, userId, isPackage}: HotelRequest): Promise<HotelResponse> {

    if (!ObjectID.isValid(userId)){
      throw new AppError("Invalid id or empty!")
    }

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new AppError("Sorry, but user not exist.");
    }

    if (!hotel || !offers) {
      throw new AppError("Hotel and offers are not empty!");
    }

    const hotelCreated = await this.hotelsRepository.create({
      userId,
      hotel,
      offers,
      isPackage,
    });

    return hotelCreated;
  }
}
