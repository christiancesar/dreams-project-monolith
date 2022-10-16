import { PackageOffersRequestDTO } from "../dtos/PackageOffersRequestDTO";
import { PackageOffersResponseDTO } from "../dtos/PackageOffersResponseDTO";

export interface IPackageTripProvider {
  mountPackageTrip(data: PackageOffersRequestDTO): Promise<PackageOffersResponseDTO[]>;
}
