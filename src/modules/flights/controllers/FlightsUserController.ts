import { Request, Response } from "express";
import { ListFlightsByUserService } from "../services/flightsUser/ListFlightsByUserService";

export class FlightsUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listFlightsByUserService = new ListFlightsByUserService();
    const flights = await listFlightsByUserService.execute({ userId });
    return response.json(flights)
  }
}

