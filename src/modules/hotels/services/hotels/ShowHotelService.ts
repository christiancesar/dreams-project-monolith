import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ShowHotelRequestDTO } from "../../dtos/ShowHotelRequestDTO";
import { Hotel } from "../../entities/HotelEntity";
import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

@injectable()
export class ShowHotelService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository
  ) {
  }

  async execute({ hotelId }: ShowHotelRequestDTO): Promise<Hotel | null> {
    if (!ObjectID.isValid(hotelId)) {
      throw new AppError("Invalid id")
    }

    const hotel = await this.hotelsRepository.findByHotelId(hotelId);

    if (!hotel) {
      throw new AppError('Hotel not found');
    }

    return this.hotelsRepository.findByHotelId(hotelId)
  }
}
