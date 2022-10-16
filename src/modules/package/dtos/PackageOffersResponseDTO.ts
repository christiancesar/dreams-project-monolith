import { FlightOffer } from "../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { HotelOffer } from "../../../@types/amadeus/hotels/HotelOfferSearchResponse";

export type PackageOffersResponseDTO = {
  flight: FlightOffer;
  hotel: HotelOffer;
  off: number;
  amount: number;
}
