import ObjectID from "bson-objectid";
import { AppError } from "../../../../errors/AppError";
import { Hotel } from "../../entities/HotelEntity";
import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";

type ShowHotelRequest = {
  hotelId: string
}


export class ShowHotelService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository()
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
