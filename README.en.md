# Dreams: Monolith

Monolithic implementation of a travel-package booking application (flights, hotels and packages). It is one of the two case studies in my Bachelor's thesis [Microservices Architecture: Projects, Patterns and Principles](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf) (UFR, 2022, in Portuguese).

The same domain was later split into microservices in [dreams-project-microservices](https://github.com/christiancesar/dreams-project-microservices). Comparing the two is the goal of the thesis.

Portuguese version: [README.md](README.md)

## Stack

- TypeScript and Node.js
- Express, with `express-async-errors` for async error handling
- Prisma with MongoDB (MongoDB Atlas)
- tsyringe for dependency injection
- Amadeus SDK for flight and hotel search

## Architecture

The project follows hexagonal architecture, with DDD to separate the domains. Each domain lives in `src/modules/<domain>` and has the same layout:

```
src/modules/flights/
├── controllers/     # receives the HTTP request and calls the service
├── dtos/            # input and output shapes
├── entities/        # domain entity
├── repositories/
│   ├── interfaces/  # persistence contract
│   └── implementations/  # Prisma implementation
├── routes/          # Express routes for the domain
└── services/        # business rules, one class per use case
```

Main points:

- **Domains:** `users`, `flights`, `hotels` and `package`. The package domain uses flights and hotels to build an offer.
- **Ports and adapters:** external providers sit behind interfaces in `src/shared/containers/providers`. For example, `IFlightProvider` is implemented by `FlightAmadeusProvider`. Switching providers means writing another implementation, without touching the services.
- **Dependency injection:** `src/shared/containers` registers the implementations with tsyringe.
- **Shared code:** `src/shared` holds errors, middlewares and containers used by more than one domain.
- **Persistence:** `prisma/schema.prisma` defines the `User`, `Flight`, `Hotel` and `Package` models, each mapped to a MongoDB collection.

## Routes

The API runs at `http://localhost:3333`. Routes are mounted in `src/routes.ts`.

| Method | Route | Description |
|---|---|---|
| POST | `/users` | Registers a user |
| GET | `/users` | Lists users |
| GET | `/users/:userId` | Shows a user |
| PATCH | `/users` | Updates a user |
| GET | `/flights/offers` | Searches flight offers (JSON body) |
| POST | `/flights` | Registers the chosen flight |
| GET | `/flights` | Lists registered flights |
| GET | `/flights/:flightId` | Shows a flight |
| GET | `/flights/user/:userId` | Flights of a user |
| GET | `/hotels/offers` | Searches hotel offers (JSON body) |
| POST | `/hotels` | Registers the chosen hotel |
| GET | `/hotels` | Lists registered hotels |
| GET | `/hotels/:hotelId` | Shows a hotel |
| POST | `/packages` | Builds and registers a package |
| GET | `/packages/offers` | Searches package offers |
| GET | `/packages/user/:userId` | Packages of a user |

Example flight search:

```bash
curl -X GET http://localhost:3333/flights/offers \
  -H "Content-Type: application/json" \
  -d '{
    "originLocationCode": "CGB",
    "destinationLocationCode": "GRU",
    "departureDate": "2022-12-10",
    "adults": 1,
    "travelClass": "ECONOMY"
  }'
```

`doc/endpoints-insomnia.json` exports every request for Insomnia.

## Prerequisites

- Node.js LTS and Yarn
- A MongoDB cluster (MongoDB Atlas, or a local replica set, which Prisma requires)
- Amadeus API credentials (`AMADEUS_CLIENT_ID` and `AMADEUS_CLIENT_SECRET`)

## Running it

1. Clone the repository and install dependencies:

   ```bash
   yarn install
   ```

2. Create a `.env` file at the root. This project has no `.env.example`, so use these variables:

   ```env
   DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/dreams"
   AMADEUS_CLIENT_ID=<your-client-id>
   AMADEUS_CLIENT_SECRET=<your-client-secret>
   ```

3. Generate the Prisma client and sync the schema with the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   MongoDB does not use migrations, which is why the command is `db push`.

4. Start the server:

   ```bash
   yarn dev:server
   ```

   The server listens on `http://localhost:3333`.

## Known limitations

- **Amadeus:** the Amadeus Self-Service program, used during the thesis, was shut down in July 2026. Without Enterprise access, the `offers` routes do not return external data. The other routes work with data stored in the database.
- **`prisma:migrate` script:** `package.json` points to `./src/providers/prisma/schema.prisma`, which does not exist. The real schema is `prisma/schema.prisma`, so use `npx prisma db push` as above.
- **Stripe:** the `stripe` dependency is listed in `package.json` but not used in the code. The payment domain was not implemented, as the thesis explains in section 3.1.2.

## Documentation

- Full thesis (Portuguese): [PDF](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf)
- Directory structure: `doc/directories-tree.md`
- Flight and hotel schemas: `doc/flightsSchema.json` and `doc/hotelsSchema.json`
