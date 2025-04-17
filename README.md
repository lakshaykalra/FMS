# Flight Management System (FMS)

## Overview
This application is a Flight Management System built using modern technologies to handle flight bookings efficiently. It is designed to support scalability and performance for high-concurrency scenarios.

## Technologies Used
- **PostgresDB**: Used as the database.
- **Sequelize ORM**: For database interactions.
- **NestJS**: As the application framework.
- **Node.js**: Version 22.12.0 LTS.

## Getting Started

### Installation
To set up the application, run the following commands:

```bash
npm install --legacy-peer-deps
```

### Start the Application
To start the application in development mode, use:

```bash
npm run start:dev
```

## API Documentation
This application is integrated with Swagger OpenAPI for API documentation. To access the Swagger page, open the following URL in your browser:

```
http://localhost:3000/api
```

## Health Checkpoint

A `/health` endpoint has been added to verify the application's health and the connection to the Postgres database. This endpoint can be integrated with observability and monitoring tools such as ELK to trigger alerts if something goes wrong with the application.

## Performance Optimization for High-Concurrency Scenarios

### Problem Statement
If there are 1.5 million users for flight bookings, how can we maximize and increase the performance of the app to ensure that concurrent requests do not result in double bookings?

### Solution
We propose using **Redis** for seat locking to handle high-concurrency scenarios effectively. Here’s how it works:

1. **Redis for Seat Locking**:
   - Store all locked seats in Redis (in-memory database) with seat-wise keys.
   - Every transaction checks Redis first to see if the seat is already locked.
   - If the seat is locked, the transaction fails immediately.

2. **Advantages**:
   - Reduces database contention by avoiding row-based locking.
   - Improves performance by leveraging Redis’s in-memory operations.

3. **Implementation Suggestion**:
   - Introduce a unique identifier for trips per flight to manage seat locks effectively.
   - Use Redis-based locking for scalability and performance.

### Current Implementation
In the current implementation, row-based locking is used to prevent double bookings. While this works for smaller scales, Redis-based locking is recommended for larger scales to handle high concurrency efficiently.