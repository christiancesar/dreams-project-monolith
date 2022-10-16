import { inject, injectable } from "tsyringe";
import { IFlightProvider } from "../../FlightProvider/interfaces/IFlightProvider";
import { IHotelProvider } from "../../HotelProvider/interfaces/IHotelProvider";
import { IPackageTripProvider } from "../interfaces/IPackageTripProvider";
import {PackageOffersRequestDTO} from "../dtos/PackageOffersRequestDTO";
import { PackageOffersResponseDTO } from "../dtos/PackageOffersResponseDTO";
import { isMatch, isYesterday } from "date-fns";
import { AppError } from "../../../../errors/AppError";

@injectable()
export class PackageTripAmadeusProvider implements IPackageTripProvider {
  constructor(
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider,
    @inject('FlightProvider')
    private flightProvider: IFlightProvider
  ) {}

  async mountPackageTrip({
    adults,
    children,
    departureDate,
    destinationLocationCode,
    infants,
    originLocationCode,
    returnDate,
    travelClass,
    roomQuantity
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
      roomQuantity
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

    return packages;
  }
}
