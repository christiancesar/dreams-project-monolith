import { isMatch, isYesterday } from "date-fns";
import { container, inject, injectable } from "tsyringe";
import { IFlightProvider } from "../../../../shared/containers/providers/FlightProvider/interfaces/IFlightProvider";
import { IHotelProvider } from "../../../../shared/containers/providers/HotelProvider/interfaces/IHotelProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { FlightOfferSearchService } from "../../../flights/services/flightOffers/FlightOfferSearchService";
import { HotelOfferSearchService } from "../../../hotels/services/hotelOffers/HotelOffersSearchService";
import { PackageOffersResponseDTO } from "../../dtos/PackageOffersResponseDTO";

@injectable()
export class AssemblingPackageService {
  constructor(
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider,
    @inject('FlightProvider')
    private flightProvider: IFlightProvider
  ) {}

  async execute({
    adults,
    children,
    departureDate,
    destinationLocationCode,
    infants,
    originLocationCode,
    returnDate,
    travelClass
  }: PackageOffersRequestDTO): Promise<PackageOffersResponseDTO[]> {

    if (!isMatch(departureDate, 'yyyy-MM-dd')) {
      throw new AppError("Formart departure date not match, example format yyyy-MM-dd.");
    }

    const parts = departureDate.split('-')

    const newDateFepartureDate = new Date(Number(parts[0]), Number(parts[1]), Number(parts[2]))

    if (isYesterday(newDateFepartureDate)) {
      throw new AppError("You can't search in the past.");
    }


    const flights = await this.flightProvider.findFlights({
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass
    });

    const hotels = await this.hotelProvider.findHotels ({
      adults,
      checkInDate: departureDate,
      checkOutDate: returnDate,
      cityCode: destinationLocationCode,
      roomQuantity: 1
    });

    const packages: PackageOffersResponseDTO[] = [];

    if (hotels.data.length < flights.data.length) {
      for (let index = 0; index < hotels.data.length; index++) {
        packages.push({
          flight: flights.data[index],
          hotel: hotels.data[index],
          amount: Number(hotels.data[index].offers[0].price.total) + Number(flights.data[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,

        } as PackageOffersResponseDTO)

      }
    } else {
      for (let index = 0; index < flights.data.length; index++) {
        packages.push({
          flight: flights.data[index],
          hotel: hotels.data[index],
          amount: Number(hotels.data[index].offers[0].price.total) + Number(flights.data[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,
        } as PackageOffersResponseDTO)

      }
    }

    return packages
  }
}
