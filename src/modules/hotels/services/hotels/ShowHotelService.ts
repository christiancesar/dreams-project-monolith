import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Hotel } from "../../entities/HotelEntity";
import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";

type ShowHotelRequest = {
  hotelId: string
}

@injectable()
export class ShowHotelService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: HotelsRepository
  ) {
  }

  async execute({ hotelId }: ShowHotelRequest): Promise<Hotel | null> {
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
