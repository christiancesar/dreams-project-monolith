import { inject, injectable } from "tsyringe";
import { Hotel } from "../../entities/HotelEntity";
import { HotelsRepository } from "../../repositories/implementations/HotelsRepository";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

@injectable()
export class ListHotelsService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

  ) {  }


  async execute(): Promise<Hotel[]> {
    return this.hotelsRepository.findAllHotels()
  }
}
