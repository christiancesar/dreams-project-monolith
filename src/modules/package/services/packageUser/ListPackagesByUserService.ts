import { inject, injectable } from "tsyringe";
import { Flight } from "../../../flights/entities/FlightEntity";
import { IFlightsRepository } from "../../../flights/repositories/interfaces/IFlightsRepository";
import { Hotel } from "../../../hotels/entities/HotelEntity";
import { IHotelsRepository } from "../../../hotels/repositories/interfaces/IHotelsRepository";
import { Package } from "../../entities/PackageEntity";
import { IPackageRepository } from "../../repositories/interfaces/IPackageRepository";

type PackagesByUserRequest = {
  userId: string
}

type PackageCreateResponse = {
  id: string
  hotel: Hotel;
  flight: Flight;
  amount: number;
  off: number;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class ListPackagesByUserService {


  constructor(
    @inject('PackageRepository')
    private packageRepository: IPackageRepository,

    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,

    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,
  ) {  }

  async execute({ userId }: PackagesByUserRequest): Promise<PackageCreateResponse[]> {

    const packages = await this.packageRepository.findPackagesByUserId(userId);
    let packagesByUser: PackageCreateResponse[];

    const packagesByUserPromise = packages.map(
      async (package_: Package) => {
        const flight = await this.flightsRepository.findByFlightId(package_.flightId);
        const hotel = await this.hotelsRepository.findByHotelId(package_.hotelId);

        return {
          id: package_.id,
          flight,
          hotel,
          amount: package_.amount,
          off: package_.off,
          createdAt: package_.createdAt,
          updatedAt: package_.updatedAt,
        }
      }
    );

    await Promise.all(packagesByUserPromise).then((results) => {
      packagesByUser = results;
    });

    return packagesByUser;
  }
}
