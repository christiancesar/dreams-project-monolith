import { CreateFlightDTO } from "../../dtos/CreateFlightDTO"
import { Flight } from "../../entities/FlightEntity"

export interface IFlightsRepository {
  create(data: CreateFlightDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight | null>
  findAll(): Promise<Flight[]>
  deleteFlight(flightId: string): Promise<void>
  findByUserId(userId: string): Promise<Flight[]>
}
