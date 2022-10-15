import { ICreatePackageDTO } from "../../dtos/ICreatePackageDTO";
import { Package } from "../../entities/PackageEntity";

export default interface IPackageRepository {
  create(data: ICreatePackageDTO): Promise<Package>;
  findAllPackages(): Promise<Package[]>;
  findPackagesByUserId(userId: string): Promise<Package[]>;
}
