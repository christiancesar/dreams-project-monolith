import { ICreateFlightDTO } from "../../dtos/ICreateFlightDTO"
import { Flight } from "../../entities/FlightEntity"

export default interface IFlightsRepository {
  create(data: ICreateFlightDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight | null>
  findAll(): Promise<Flight[]>

  findByUserId(userId: string): Promise<Flight[]>
}
