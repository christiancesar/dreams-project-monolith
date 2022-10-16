import { inject, injectable } from "tsyringe";
import { Flight } from "../../../flights/entities/FlightEntity";
import { IFlightsRepository } from "../../../flights/repositories/interfaces/IFlightsRepository";
import { Hotel } from "../../../hotels/entities/HotelEntity";
import { IHotelsRepository } from "../../../hotels/repositories/interfaces/IHotelsRepository";
import { PackageCreateResponseDTO } from "../../dtos/PackageCreateResponseDTO";
import { Package } from "../../entities/PackageEntity";
import { IPackageRepository } from "../../repositories/interfaces/IPackageRepository";

@injectable()
export class CreatePackageService {
  constructor(
    @inject('PackageRepository')
    private packageRepository: IPackageRepository,

    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,
  ) { }

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
