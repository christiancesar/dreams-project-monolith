import { Router } from "express";
import { PackageOffersControllers } from "../controllers/PackageOffersController";

const packageOffersRouter = Router();
const packageOffersController = new PackageOffersControllers();

packageOffersRouter.use('/', packageOffersController.index)

export default packageOffersRouter;
