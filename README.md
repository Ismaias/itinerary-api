# Lost in Europe - Itinerary API

A robust, scalable NestJS API for sorting and managing travel tickets, inspired by "Kevin McCallister is Lost in Europe".

---

## Overview
This project provides a REST API to:
- Accept unordered travel tickets and return the full, ordered itinerary
- Support multiple types of transit (train, tram, bus, airport bus, flight, etc.)
- Output a human-readable summary of the journey
- Be easily extensible for new transit types and business rules

The codebase follows Clean Architecture and DDD principles for maintainability and scalability.

---

## Features
- **Automatic itinerary sorting** from unordered tickets
- **Extensible transit types** via enums and flexible details
- **Swagger/OpenAPI documentation** at `/`
- **Unit and integration tests**
- **Environment-based configuration**

---

## Quick Start

### 1. Clone and Install
```bash
git clone <repo-url>
cd lost-in-europe
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in your values:
```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
PORT=
NODE_ENV=
```

### 3. Run the Application
```bash
npm run start:dev
```

### 4. Access API Docs
Visit [http://localhost:3000/](http://localhost:3000/) for Swagger UI and try the endpoints.

---

## API Usage Example

### Create an Itinerary
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

**Response:**
```json
{
  "itineraryId": "<uuid>"
}
```

### Get Human-Readable Summary
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

## Testing

- **Unit tests:**
  ```bash
  npm run test
  ```
- **Integration/E2E tests:**
  ```bash
  npm run test:e2e
  ```
- **Coverage:**
  ```bash
  npm run test:cov
  ```

---

## Extending the API
- To add a new transit type, update the `TicketType` enum, extend the `TicketDetailsDto` and update the formatter in the domain entity.
- Add new endpoints or business rules by creating new use cases and controllers.
- See the code comments and Swagger docs for more details.

---

## Assumptions
- The itinerary is a single, uninterrupted chain (no branches or cycles)
- All tickets are valid and form a continuous path
- All required fields (`from`, `to`, `type`) must be present in each ticket
- The API does not currently support multiple disconnected itineraries in a single request
- The system assumes all tickets are for the same traveler and trip
- To add new transit types, update the enum, DTO, and formatter
- If any information needed for a new transit type or business rule is missing, make reasonable assumptions and document them here

---

## What Can Be Improved

- **Migrations**: Implement database migrations for safe schema evolution and production readiness (e.g., with TypeORM migrations).
- **Front-end**: Develop a user-friendly front-end to consume and visualize the itinerary API.
- **Integration and E2E Tests**: Test real integration with the database (TypeORM) and REST endpoints to ensure end-to-end reliability.
- **Centralized Error Handling and Logging**: Implement global interceptors/filters for consistent error handling and centralized logging.
- **Performance and Concurrency**: For large-scale usage, consider queues, caching, and sharding/partitioning strategies to improve scalability and throughput.
- **Internationalization (i18n)**: If needed, prepare the system for multiple languages in user-facing messages and summaries.