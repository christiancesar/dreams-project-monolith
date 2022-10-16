import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFlightService } from "../services/flights/CreateFlightService";
import { ListFlightsService } from "../services/flights/ListFlightsService";
import { ShowFlightService } from "../services/flights/ShowFlightService";


export class FlightsController {

  async create(request: Request, response: Response): Promise<Response> {
    const { itineraries, price, userId, isPackage } = request.body
    const createFlightService = container.resolve(CreateFlightService);
    const flights = await createFlightService.execute({ itineraries, price, userId, isPackage })
    return response.json(flights)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { flightId } = request.params
    const showFlightService = container.resolve(ShowFlightService);
    const flights = await showFlightService.execute({ flightId })
    return response.json(flights)
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listFlightsService = container.resolve(ListFlightsService);
    const flights = await listFlightsService.execute();
    return response.json(flights)
  }
}
