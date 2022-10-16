import { inject, injectable } from "tsyringe";
import { HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { HotelOffersSearchDTO } from "../../../../shared/containers/providers/HotelProvider/dtos/HotelOffersSearchDTO";
import { IHotelProvider } from "../../../../shared/containers/providers/HotelProvider/interfaces/IHotelProvider";

@injectable()
export class HotelOfferSearchService {
  constructor(
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider
  ) { }
  async execute({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: HotelOffersSearchDTO): Promise<HotelOfferSearchResponse> {
    const hotelOffersSearch = await this.hotelProvider.findHotels(
      {
        adults,
        checkInDate,
        checkOutDate,
        cityCode,
        roomQuantity
      }
    );

    return hotelOffersSearch
  }
}
