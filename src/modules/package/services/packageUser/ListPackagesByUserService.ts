import { Flight } from "../../../flights/entities/FlightEntity";
import { FlightsRepository } from "../../../flights/repositories/implementations/FlightsRepository";
import { Hotel } from "../../../hotels/entities/HotelEntity";
import { HotelsRepository } from "../../../hotels/repositories/implementations/HotelsRepository";
import { Package } from "../../entities/PackageEntity";
import PackageRepository from "../../repositories/implementations/PackageRepository";

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


class ListPackagesByUserService {
  private packageRepository: PackageRepository;
  private flightsRepository: FlightsRepository;
  private hotelsRepository: HotelsRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
    this.flightsRepository = new FlightsRepository();
    this.hotelsRepository = new HotelsRepository();
  }

  async execute({ userId }: PackagesByUserRequest): Promise<PackageCreateResponse[]> {

    const packages = await this.packageRepository.findPackagesByUserId(userId);
    let packagesByUser: PackageCreateResponse[]

    const packagesByUserPromise = packages.map(
      async (package_: Package) => {
        const flight = await this.flightsRepository.findByFlightId(package_.flightId);
        const hotel = await this.hotelsRepository.findByHotelId(package_.hotelId);

        return{
          id: package_.id,
          flight,
          hotel,
          amount: package_.amount,
          off: package_.off,
          createdAt: package_.createdAt,
          updatedAt: package_.updatedAt,
        }
      }
    )

    await Promise.all(packagesByUserPromise).then((results) => {
      packagesByUser = results;
    })

    return packagesByUser;
  }
}

export default ListPackagesByUserService;
