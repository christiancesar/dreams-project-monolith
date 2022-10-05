import { HotelOfferSearchRequest } from "../../../../@types/amadeus/hotels/HotelOfferSearchRequest";
import { HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { amadeus } from "../../../../providers/amadeus/amadeusApi";
import IHotelOffersSearch from "../../dtos/IHotelOffersSearch";

export default class HotelOfferSearchService {
  async execute({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: IHotelOffersSearch): Promise<HotelOfferSearchResponse> {
    const hotelOffersSearch = await amadeus.shopping.hotelOffers.get({
      cityCode,
      checkInDate,
      checkOutDate,
      roomQuantity,
      adults,
      radius: 50,
      radiusUnit: 'KM',
      paymentPolicy: 'NONE',
      includeClosed: false,
      bestRateOnly: true,
      view: 'FULL',
      sort: 'NONE',
      currency: 'BRL',
      // "page%5Blimit%5D": 1
    } as HotelOfferSearchRequest) as HotelOfferSearchResponse;

    return hotelOffersSearch
  }
}