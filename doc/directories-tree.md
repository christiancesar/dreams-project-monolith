| |
📦src
 ┣ 📂@types
 ┃ ┗ 📂amadeus
 ┃ ┃ ┣ 📂flights
 ┃ ┃ ┃ ┣ 📜FlightOfferSearchRequest.ts
 ┃ ┃ ┃ ┣ 📜FlightOfferSearchResponse.ts
 ┃ ┃ ┃ ┗ 📜TravelClass.ts
 ┃ ┃ ┗ 📂hotels
 ┃ ┃ ┃ ┣ 📜HotelOfferSearchRequest.ts
 ┃ ┃ ┃ ┗ 📜HotelOfferSearchResponse.ts
 ┣ 📂modules
 ┃ ┣ 📂flights
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜FlightsController.ts
 ┃ ┃ ┃ ┣ 📜FlightsOffersController.ts
 ┃ ┃ ┃ ┗ 📜FlightsUserController.ts
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜CreateFlightRequestDTO.ts
 ┃ ┃ ┃ ┣ 📜ListFlightByUserRequestDTO.ts
 ┃ ┃ ┃ ┗ 📜ShowFlightRequestDTO.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜FlightEntity.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜FlightsRepository.ts
 ┃ ┃ ┃ ┗ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜IFlightsRepository.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜flightsOffersRouter.ts
 ┃ ┃ ┃ ┣ 📜flightsRouter.ts
 ┃ ┃ ┃ ┗ 📜flightsUserRouter.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📂flightOffers
 ┃ ┃ ┃ ┃ ┗ 📜FlightOfferSearchService.ts
 ┃ ┃ ┃ ┣ 📂flights
 ┃ ┃ ┃ ┃ ┣ 📜CreateFlightService.ts
 ┃ ┃ ┃ ┃ ┣ 📜ListFlightsService.ts
 ┃ ┃ ┃ ┃ ┗ 📜ShowFlightService.ts
 ┃ ┃ ┃ ┗ 📂flightsUser
 ┃ ┃ ┃ ┃ ┗ 📜ListFlightsByUserService.ts
 ┃ ┣ 📂hotels
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜HotelOffersController.ts
 ┃ ┃ ┃ ┣ 📜HotelsController.ts
 ┃ ┃ ┃ ┗ 📜HotelUserController.ts
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜CreateHotelRequestDTO.ts
 ┃ ┃ ┃ ┣ 📜CreateHotelResponseDTO.ts
 ┃ ┃ ┃ ┣ 📜HotelOffersSearch.ts
 ┃ ┃ ┃ ┗ 📜ShowHotelRequestDTO.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜HotelEntity.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜HotelsRepository.ts
 ┃ ┃ ┃ ┗ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜IHotelsRepository.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜hotelOffersRouter.ts
 ┃ ┃ ┃ ┣ 📜hotelRouter.ts
 ┃ ┃ ┃ ┗ 📜hotelUserRouter.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📂hotelOffers
 ┃ ┃ ┃ ┃ ┗ 📜HotelOffersSearchService.ts
 ┃ ┃ ┃ ┣ 📂hotels
 ┃ ┃ ┃ ┃ ┣ 📜CreateHotelService.ts
 ┃ ┃ ┃ ┃ ┣ 📜ListHotelsService.ts
 ┃ ┃ ┃ ┃ ┗ 📜ShowHotelService.ts
 ┃ ┃ ┃ ┗ 📂hotelsUser
 ┃ ┃ ┃ ┃ ┗ 📜ListHotelsByUserService.ts
 ┃ ┣ 📂package
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜PackageController.ts
 ┃ ┃ ┃ ┣ 📜PackageOffersController.ts
 ┃ ┃ ┃ ┗ 📜PackageUserController.ts
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜PackageCreateRequestDTO.ts
 ┃ ┃ ┃ ┣ 📜PackageCreateResponseDTO.ts
 ┃ ┃ ┃ ┗ 📜PackagesByUserRequestDTO.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜PackageEntity.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜PackageRepository.ts
 ┃ ┃ ┃ ┗ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜IPackageRepository.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜packageOffersRouter.ts
 ┃ ┃ ┃ ┣ 📜packagesRouter.ts
 ┃ ┃ ┃ ┗ 📜packageUserRouter.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📂package
 ┃ ┃ ┃ ┃ ┗ 📜CreatePackageService.ts
 ┃ ┃ ┃ ┣ 📂packageOffers
 ┃ ┃ ┃ ┃ ┗ 📜AssemblingPackageService.ts
 ┃ ┃ ┃ ┗ 📂packageUser
 ┃ ┃ ┃ ┃ ┗ 📜ListPackagesByUserService.ts
 ┃ ┗ 📂users
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┗ 📜UsersControllers.ts
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜CreateUserRequestDTO.ts
 ┃ ┃ ┃ ┣ 📜ShowUserRequestDTO.ts
 ┃ ┃ ┃ ┗ 📜UpdateUserRequestDTO.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜UserEntity.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜UsersRepository.ts
 ┃ ┃ ┃ ┗ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜IUserRepository.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┗ 📜usersRouter.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📜CreateUserService.ts
 ┃ ┃ ┃ ┣ 📜ListUsersService.ts
 ┃ ┃ ┃ ┣ 📜ShowUserService.ts
 ┃ ┃ ┃ ┗ 📜UpdateUserService.ts
 ┣ 📂shared
 ┃ ┣ 📂containers
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┣ 📂FlightProvider
 ┃ ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┃ ┗ 📜FlightOffersSearchDTO.ts
 ┃ ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┃ ┗ 📜FlightAmadeusProvider.ts
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┗ 📜IFlightProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂HotelProvider
 ┃ ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┃ ┗ 📜HotelOffersSearchDTO.ts
 ┃ ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┃ ┗ 📜HotelAmadeusProvider.ts
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┗ 📜IHotelProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂PackageTripProvider
 ┃ ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PackageOffersRequestDTO.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜PackageOffersResponseDTO.ts
 ┃ ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┃ ┗ 📜PackageTripAmadeusProvider.ts
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┗ 📜IPackageTripProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┗ 📜AppError.ts
 ┃ ┗ 📂middlewares
 ┃ ┃ ┗ 📜interceptErrorMiddleware.ts
 ┣ 📜routes.ts
 ┗ 📜server.ts
