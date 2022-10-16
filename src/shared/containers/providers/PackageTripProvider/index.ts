import { container } from "tsyringe";
import { PackageTripAmadeusProvider } from "./implementations/PackageTripAmadeusProvider";
import { IPackageTripProvider } from "./interfaces/IPackageTripProvider";

const packageTripAmadeusProvider = container.resolve(PackageTripAmadeusProvider);

container.registerInstance<IPackageTripProvider>(
  'PackageTripProvider',
  packageTripAmadeusProvider
)
