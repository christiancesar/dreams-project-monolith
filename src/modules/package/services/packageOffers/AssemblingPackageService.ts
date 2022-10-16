import { isMatch, isYesterday } from "date-fns";
import { container } from "tsyringe";
import { FlightOffer } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { HotelOffer } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { AppError } from "../../../../shared/errors/AppError";
import { FlightOfferSearchService } from "../../../flights/services/flightOffers/FlightOfferSearchService";
import { HotelOfferSearchService } from "../../../hotels/services/hotelOffers/HotelOffersSearchService";
import { Package } from "../../entities/PackageEntity";

type PackageOffersRequest = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
  roomQuantity: number;
}

type PackageResponse = {
  flight: FlightOffer;
  hotel: HotelOffer;
  off: number;
  amount: number;
}

export class AssemblingPackageService {
  async execute({
    adults,
    children,
    departureDate,
    destinationLocationCode,
    infants,
    originLocationCode,
    returnDate,
    travelClass
  }: PackageOffersRequest): Promise<Package[]> {
    // isBefore(new Date(departureDate), Date.now())
    if (!isMatch(departureDate, 'yyyy-MM-dd')) {
      throw new AppError("Formart departure date not match, example format yyyy-MM-dd.");
    }

    const parts = departureDate.split('-')

    const newDateFepartureDate = new Date(Number(parts[0]), Number(parts[1]), Number(parts[2]))

    if (isYesterday(newDateFepartureDate)) {
      throw new AppError("You can't search in the past.");
    }

    const flightOfferSearchService = container.resolve(FlightOfferSearchService);

    const hotelOfferSearchService = container.resolve(HotelOfferSearchService);

    const flights = await flightOfferSearchService.execute({
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass
    });

    const hotels = await hotelOfferSearchService.execute({
      adults,
      checkInDate: departureDate,
      checkOutDate: returnDate,
      cityCode: destinationLocationCode,
      roomQuantity: 1
    });

    const packages = [];

    if (hotels.data.length < flights.data.length) {
      for (let index = 0; index < hotels.data.length; index++) {
        packages.push({
          flight: flights.data[index],
          hotel: hotels.data[index],
          amount: Number(hotels.data[index].offers[0].price.total) + Number(flights.data[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,

        } as PackageResponse)

      }
    } else {
      for (let index = 0; index < flights.data.length; index++) {
        packages.push({
          flight: flights.data[index],
          hotel: hotels.data[index],
          total: Number(hotels.data[index].offers[0].price.total) + Number(flights.data[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,
        })

      }
    }

    return packages as Package[]
  }
}
