import { prisma } from "@prisma/client";
import { Flight } from "../../../flights/entities/FlightEntity";
import { FlightsRepository } from "../../../flights/repositories/implementations/FlightsRepository";
import { Hotel } from "../../../hotels/entities/HotelEntity";
import { HotelsRepository } from "../../../hotels/repositories/implementations/HotelsRepository";
import { Package } from "../../entities/PackageEntity";
import PackageRepository from "../../repositories/implementations/PackageRepository";

type CreateFlightDTO = {
  userId: string;
  itineraries: string;
  price: string;
}

type CreateHotelDTO = {
  userId: string;
  hotel: string;
  offers: string;
}

type PackageCreateRequestDTO = {
  userId: string;
  hotel: {
    hotel: any;
    offers: any;
  };
  flight: {
    itineraries: any;
    price: any;
  };
  amount: number;
  off: number;
}

type PackageCreateResponseDTO = {
  id: string
  hotel: {
    hotel: any;
    offers: any;
  };
  flight: {
    itineraries: any;
    price: any;
  };
  amount: number;
  off: number;
  createdAt: Date;
  updatedAt: Date;
}

class CreatePackageService {
  private packageRepository: PackageRepository;
  private hotelsRepository: HotelsRepository;
  private flightsRepository: FlightsRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
    this.hotelsRepository = new HotelsRepository();
    this.flightsRepository = new FlightsRepository();
  }

  async execute({ userId, hotel, flight, amount, off }: PackageCreateRequestDTO): Promise<PackageCreateResponseDTO> {

    let flightCreated: Flight;
    let hotelCreated: Hotel;
    let packageCreated: Package;

    flightCreated = await this.flightsRepository.create({
      itineraries: flight.itineraries,
      price: flight.price,
      userId,
      isPackage: true
    })

    try {
      hotelCreated = await this.hotelsRepository.create({
        userId,
        hotel: hotel.hotel,
        offers: hotel.offers,
        isPackage: true,
      })
    } catch (error) {
      await this.flightsRepository.deleteFlight(flightCreated.id);
      console.error(`Error on CreatePackageService when create package: ${error}`);
    }

    try {
      packageCreated = await this.packageRepository.create({
        userId,
        flightId: flightCreated.id,
        hotelId: hotelCreated.id,
        amount,
        off
      })
    } catch (error) {
      await this.flightsRepository.deleteFlight(flightCreated.id);
      await this.hotelsRepository.deleteHotel(hotelCreated.id);
      console.error(`Error on CreatePackageService when create package: ${error}`);
    }


    return {
      id: packageCreated.id,
      hotel: hotelCreated,
      flight: flightCreated,
      amount: packageCreated.amount,
      off: packageCreated.off,
      createdAt: packageCreated.createdAt,
      updatedAt: packageCreated.updatedAt,
    }
  }
}

export default CreatePackageService
