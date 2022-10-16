import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { CreateHotelRequestDTO } from "../../dtos/CreateHotelRequestDTO";
import { CreateHotelResponseDTO } from "../../dtos/CreateHotelResponseDTO";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

@injectable()
export class CreateHotelService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

    @inject('HotelsRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({ hotel, offers, userId, isPackage }: CreateHotelRequestDTO): Promise<CreateHotelResponseDTO> {

    if (!ObjectID.isValid(userId)) {
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
