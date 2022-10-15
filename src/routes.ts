import { Router } from "express";
import flightsRouter from "./modules/flights/routes/flightsRouter";
import hotelRouter from "./modules/hotels/routes/hotelRouter";
import packageRouter from "./modules/package/routes/packagesRouter";
import usersRouter from "./modules/users/routes/usersRouter";


export const routes = Router();

routes.use('/users', usersRouter);

routes.use('/flights', flightsRouter)

routes.use('/hotels', hotelRouter)

routes.use('/packages', packageRouter)
