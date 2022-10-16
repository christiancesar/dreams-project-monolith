import { container } from 'tsyringe';
import { FlightsRepository } from '../../modules/flights/repositories/implementations/FlightsRepository';
import { IFlightsRepository } from '../../modules/flights/repositories/interfaces/IFlightsRepository';
import { HotelsRepository } from '../../modules/hotels/repositories/implementations/HotelsRepository';
import { IHotelsRepository } from '../../modules/hotels/repositories/interfaces/IHotelsRepository';
import { PackageRepository } from '../../modules/package/repositories/implementations/PackageRepository';
import { IPackageRepository } from '../../modules/package/repositories/interfaces/IPackageRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/users/repositories/interfaces/IUserRepository';


container.registerSingleton<IFlightsRepository>(
  'FlightsRepository',
  FlightsRepository,
);

container.registerSingleton<IHotelsRepository>(
  'HotelsRepository',
  HotelsRepository,
);

container.registerSingleton<IPackageRepository>(
  'PackageRepository',
  PackageRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

