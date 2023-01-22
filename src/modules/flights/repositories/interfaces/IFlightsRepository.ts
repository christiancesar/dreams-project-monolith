import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO"
import { Flight } from "../../entities/FlightEntity"

export interface IFlightsRepository {
  create(data: CreateFlightRequestDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight | null>
  findAll(): Promise<Flight[]>
  deleteFlight(flightId: string): Promise<void>
  findByUserId(userId: string): Promise<Flight[]>
}
