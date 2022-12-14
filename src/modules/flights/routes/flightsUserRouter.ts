import { Router } from "express";
import { FlightsUserController } from "../controllers/FlightsUserController";

const flightsUserRouter = Router()
const flightsUserController = new FlightsUserController();

flightsUserRouter.use('/:userId', flightsUserController.index)

export default flightsUserRouter;
