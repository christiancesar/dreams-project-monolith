import { inject, injectable } from "tsyringe";
import { PackageOffersRequestDTO } from "../../../../shared/containers/providers/PackageTripProvider/dtos/PackageOffersRequestDTO";
import { PackageOffersResponseDTO } from "../../../../shared/containers/providers/PackageTripProvider/dtos/PackageOffersResponseDTO";
import { IPackageTripProvider } from "../../../../shared/containers/providers/PackageTripProvider/interfaces/IPackageTripProvider";

@injectable()
export class AssemblingPackageService {
  constructor(
    @inject('PackageTripProvider')
    private packageTripProvider: IPackageTripProvider,
  ) {}

  async execute({
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

    const packages = await this.packageTripProvider.mountPackageTrip({
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass,
      roomQuantity
    })


    return packages
  }
}
