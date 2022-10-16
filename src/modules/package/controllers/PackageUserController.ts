import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPackagesByUserService } from "../services/packageUser/ListPackagesByUserService";

export class PackageUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listPackagesByUserService = container.resolve(ListPackagesByUserService);
    const packages = await listPackagesByUserService.execute({ userId });
    return response.json(packages)
  }
}
