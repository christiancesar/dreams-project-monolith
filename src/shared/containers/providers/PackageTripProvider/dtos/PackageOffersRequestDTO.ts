export type PackageOffersRequestDTO = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
  roomQuantity: number;
}
