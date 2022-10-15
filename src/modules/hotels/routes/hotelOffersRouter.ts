import { Router } from "express";
import { HotelOffersController } from "../controllers/HotelOffersController";

const hotelOffersRouter = Router()
const hotelOffersController = new HotelOffersController();

hotelOffersRouter.get('/', hotelOffersController.index)

export default hotelOffersRouter;
