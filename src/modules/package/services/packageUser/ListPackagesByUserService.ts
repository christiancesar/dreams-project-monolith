import { inject, injectable } from "tsyringe";
import { IFlightsRepository } from "../../../flights/repositories/interfaces/IFlightsRepository";
import { IHotelsRepository } from "../../../hotels/repositories/interfaces/IHotelsRepository";
import { PackageCreateResponseDTO } from "../../dtos/PackageCreateResponseDTO";
import { PackagesByUserRequestDTO } from "../../dtos/PackagesByUserRequestDTO";
import { Package } from "../../entities/PackageEntity";
import { IPackageRepository } from "../../repositories/interfaces/IPackageRepository";

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

  async execute({ userId }: PackagesByUserRequestDTO): Promise<PackageCreateResponseDTO[]> {

    const packages = await this.packageRepository.findPackagesByUserId(userId);
    let packagesByUser: PackageCreateResponseDTO[];

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
