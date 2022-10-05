import { Hotel } from "@prisma/client";
import AppError from "../../../../errors/AppError";
import HotelsRepository from "../../repositories/implementations/HotelsRepository";

interface IHotel {
  hotelId: string
}


export default class ShowHotelService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository()
  }

  async execute({ hotelId }: IHotel): Promise<Hotel | null> {
    const hotel = await this.hotelsRepository.findByHotelId(hotelId);

    if (!hotel) {
      throw new AppError('Hotel not found');
    }

    return this.hotelsRepository.findByHotelId(hotelId)
  }
}
