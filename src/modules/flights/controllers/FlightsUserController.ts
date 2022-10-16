import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFlightsByUserService } from "../services/flightsUser/ListFlightsByUserService";

export class FlightsUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listFlightsByUserService = container.resolve(ListFlightsByUserService);
    const flights = await listFlightsByUserService.execute({ userId });
    return response.json(flights)
  }
}

