import { Hotel } from "../../entities/HotelEntity";
import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";

export default class ListHotelsService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository()
  }

  async execute(): Promise<Hotel[]> {
    return this.hotelsRepository.findAllHotels()
  }
}
