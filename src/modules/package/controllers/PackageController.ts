import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePackageService } from "../services/package/CreatePackageService";

export class PackageControllers {

  async create(request: Request, response: Response): Promise<Response> {
    const { userId, flight, hotel, amount, off } = request.body;

    const createPackageService = container.resolve(CreatePackageService);

    const packageCreated = await createPackageService.execute({
      userId,
      flight,
      hotel,
      amount,
      off
    })

    return response.json(packageCreated)
  }

}
