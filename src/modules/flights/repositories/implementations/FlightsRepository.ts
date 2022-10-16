import { prisma } from "../../../../../prisma"
import { CreateFlightDTO } from "../../dtos/CreateFlightRequestDTO"
import { Flight } from "../../entities/FlightEntity"
import { IFlightsRepository } from "../interfaces/IFlightsRepository"

export class FlightsRepository implements IFlightsRepository {
  async create(data: CreateFlightDTO): Promise<Flight> {
    const flight = await prisma.flight.create({ data })
    return flight
  }

  async findByFlightId(flightId: string): Promise<Flight | null> {
    const flight = await prisma.flight.findFirst({ where: { id: flightId } })
    return flight
  }

  async findAll(): Promise<Flight[]> {
    const flight = await prisma.flight.findMany()
    return flight
  }
  async deleteFlight(flightId: string): Promise<void> {
    await prisma.flight.delete({ where: { id: flightId } })
  }
  async findByUserId(userId: string): Promise<Flight[]> {
    const flights = await prisma.flight.findMany({
      where: {
        userId,
        isPackage: false
      }
    })

    return flights
  }
}
