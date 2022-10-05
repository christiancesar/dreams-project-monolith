import { Router } from "express";
import flightsRouter from "./modules/flights/routes/flightsRouter";
import hotelsRouter from "./modules/hotels/routes/hotelRouter";
import packagesRouter from "./modules/package/routes/packagesRouter";
import usersRouter from "./modules/users/routes/usersRouter";


const routes = Router();

routes.use('/users', usersRouter);

routes.use('/flights', flightsRouter)

routes.use('/hotels', hotelsRouter)

routes.use('/packages', packagesRouter)

export default routes;