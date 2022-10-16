import { Flight } from "../../flights/entities/FlightEntity";
import { Hotel } from "../../hotels/entities/HotelEntity";

export type PackageCreateResponseDTO = {
  id: string
  hotel: Hotel;
  flight: Flight;
  amount: number;
  off: number;
  createdAt: Date;
  updatedAt: Date;
}
