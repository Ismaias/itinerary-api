# Lost in Europe - Itinerary API

A scalable, decoupled, and extensible NestJS API for sorting and managing travel tickets, inspired by the "Kevin McCallister is Lost in Europe" scenario.

## Features
- Accepts unordered tickets and returns the full, ordered itinerary
- Supports multiple types of transit (train, tram, bus, airport bus, flight, etc.)
- Extensible for new transit types and details
- Clean Architecture & DDD principles
- Fully documented with Swagger
- Unit and integration tests included

---

## Getting Started

### Environment Variables

Before running the project, copy `.env.example` to `.env` and adjust the values as needed:

```env
# Database configuration
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# Application
PORT=3000
NODE_ENV=development
```

### Install dependencies
```bash
npm install
```

### Run the application
```bash
# development
npm run start

# watch mode
npm start:dev

# production
npm run start:prod
```

### Run tests
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## API Documentation

After starting the app, access the Swagger UI at:

```
http://localhost:3000/
```

---

## Example: Create and Retrieve an Itinerary

### Request
**POST** `/itineraries`
```json
{
  "tickets": [
    { "from": "St. Anton am Arlberg Bahnhof", "to": "Innsbruck Hbf", "type": "train", "details": { "trainNumber": "RJX 765", "platform": "3", "seat": "17C" } },
    { "from": "Innsbruck Hbf", "to": "Innsbruck Airport", "type": "tram", "details": { "tramNumber": "S5" } },
    { "from": "Innsbruck Airport", "to": "Venice Airport", "type": "flight", "details": { "flightNumber": "AA904", "gate": "10", "seat": "18B", "luggage": "Self-check-in luggage at counter." } },
    { "from": "Gara Venetia Santa Lucia", "to": "Bologna San Ruffillo", "type": "train", "details": { "trainNumber": "ICN 35780", "platform": "1", "seat": "13F" } },
    { "from": "Bologna San Ruffillo", "to": "Bologna Guglielmo Marconi Airport", "type": "airport bus", "details": {} },
    { "from": "Bologna Guglielmo Marconi Airport", "to": "Paris CDG Airport", "type": "flight", "details": { "flightNumber": "AF1229", "gate": "22", "seat": "10A", "luggage": "Self-check-in luggage at counter." } },
    { "from": "Paris CDG Airport", "to": "Chicago O'Hare", "type": "flight", "details": { "flightNumber": "AF136", "gate": "32", "seat": "10A", "luggage": "Luggage will transfer automatically from the last flight." } }
  ]
}
```

### Response
```json
{
  "itineraryId": "<uuid>"
}
```

### Get the human-readable summary
**GET** `/itineraries/{itineraryId}/summary`

**Response:**
```json
{
  "summary": [
    "Start.",
    "1. Board train RJX 765, Platform 3 from St. Anton am Arlberg Bahnhof to Innsbruck Hbf. Seat number 17C.",
    "2. Board the Tram S5 from Innsbruck Hbf to Innsbruck Airport.",
    "3. From Innsbruck Airport, board the flight AA904 to Venice Airport from gate 10, seat 18B. Self-check-in luggage at counter.",
    "4. Board train ICN 35780, Platform 1 from Gara Venetia Santa Lucia to Bologna San Ruffillo. Seat number 13F.",
    "5. Board the airport bus from Bologna San Ruffillo to Bologna Guglielmo Marconi Airport. No seat assignment.",
    "6. From Bologna Guglielmo Marconi Airport, board the flight AF1229 to Paris CDG Airport from gate 22, seat 10A. Self-check-in luggage at counter.",
    "7. From Paris CDG Airport, board the flight AF136 to Chicago O'Hare from gate 32, seat 10A. Luggage will transfer automatically from the last flight.",
    "Last destination reached."
  ]
}
```

---

## Assumptions
- The itinerary is a single, uninterrupted chain (no branches or cycles)
- All tickets are valid and form a continuous path
- To add new transit types, update the enum, DTO, and formatter

---

## License
MIT

---

## What Can Be Improved

- **Migrations**
  - Implement database migrations for safe schema evolution and production readiness (e.g., with TypeORM migrations).

- **Front-end**
  - Develop a user-friendly front-end to consume and visualize the itinerary API.

- **Integration and E2E Tests**
  - Test real integration with the database (TypeORM) and REST endpoints to ensure end-to-end reliability.

- **Centralized Error Handling and Logging**
  - Implement global interceptors/filters for consistent error handling and centralized logging.

- **Performance and Concurrency**
  - For large-scale usage, consider queues, caching, and sharding/partitioning strategies to improve scalability and throughput.

- **Internationalization (i18n)**
  - If needed, prepare the system for multiple languages in user-facing messages and summaries.

---
