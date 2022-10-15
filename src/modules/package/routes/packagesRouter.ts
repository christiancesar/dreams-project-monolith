import { Router } from "express";
import { PackageControllers } from "../controllers/PackageController";
import packageOffersRouter from "./packageOffersRouter";
import packageUserRouter from "./packageUserRouter";

const packageRouter = Router();
const packageController = new PackageControllers();

packageRouter.use('/offers', packageOffersRouter);

packageRouter.use('/user', packageUserRouter);

packageRouter.post('/', packageController.create);

export default packageRouter;
