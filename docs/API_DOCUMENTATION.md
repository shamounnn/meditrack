# MediTrack API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [API Endpoints](#api-endpoints)
4. [Database Schema](#database-schema)
5. [Authentication](#authentication)
6. [Error Handling](#error-handling)

---

## Overview

MediTrack is a professional medication management system built with:
- **Backend**: NestJS 10.x with TypeORM
- **Database**: PostgreSQL 14+
- **API**: REST + GraphQL
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI

**Base URL**: `http://localhost:4000/api`
**GraphQL Endpoint**: `http://localhost:4000/graphql`
**Swagger UI**: `http://localhost:4000/api/docs`

---

## Setup Instructions

### Prerequisites
```bash
Node.js >= 18.x
PostgreSQL >= 14.x
npm or yarn
```

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd meditrack
```

2. **Install Dependencies**
```bash
# Backend
cd api-nest
npm install

# Frontend
cd ../frontend
npm install
```

3. **Database Setup**
```bash
# Create database
createdb meditrack

# Run schema
psql meditrack < api-nest/database/schema.sql
```

4. **Environment Configuration**

Create `api-nest/.env`:
```env
PORT=4000
NODE_ENV=development
PGHOST=localhost
PGPORT=5432
PGDATABASE=meditrack
PGUSER=postgres
PGPASSWORD=your_password
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h
```

5. **Start Servers**
```bash
# Terminal 1 - Backend
cd api-nest
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api
- Swagger Docs: http://localhost:4000/api/docs
- GraphQL Playground: http://localhost:4000/graphql

---

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string (min: 3 chars)",
  "email": "string (valid email)",
  "password": "string (min: 6 chars)"
}
```

**Response (201):**
```json
{
  "user": {
    "userId": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- 400: User already exists or validation error
- 500: Server error

---

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "user": {
    "userId": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- 401: Invalid credentials
- 500: Server error

---

### Medication Endpoints

**All medication endpoints require JWT authentication.**
Include header: `Authorization: Bearer <token>`

#### GET /api/medications
Get all medications in the system.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Aspirin",
    "dosage": 500,
    "pillsPerBox": 30,
    "currentPills": 25,
    "lowStockThreshold": 5,
    "sideEffects": "Nausea, dizziness",
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### GET /api/medications/:id
Get specific medication by ID.

**Parameters:**
- `id` (path): Medication ID (integer)

**Response (200):**
```json
{
  "id": 1,
  "name": "Aspirin",
  "dosage": 500,
  "pillsPerBox": 30,
  "currentPills": 25,
  "lowStockThreshold": 5,
  "sideEffects": "Nausea, dizziness",
  "userId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- 404: Medication not found
- 401: Unauthorized

---

#### GET /api/medications/user/:userId
Get all medications for a specific user.

**Parameters:**
- `userId` (path): User ID (integer)

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Aspirin",
    "dosage": 500,
    "currentPills": 25
  }
]
```

---

#### GET /api/medications/user/:userId/low-stock
Get low stock medications for a user.

**Parameters:**
- `userId` (path): User ID (integer)

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Aspirin",
    "currentPills": 3,
    "lowStockThreshold": 5
  }
]
```

---

#### POST /api/medications
Create a new medication.

**Request Body:**
```json
{
  "name": "string (required)",
  "dosage": "number (required)",
  "pillsPerBox": "number (required)",
  "currentPills": "number (required)",
  "lowStockThreshold": "number (required)",
  "sideEffects": "string (optional)",
  "userId": "number (required)"
}
```

**Response (201):**
```json
{
  "id": 1,
  "name": "Aspirin",
  "dosage": 500,
  "pillsPerBox": 30,
  "currentPills": 30,
  "lowStockThreshold": 5,
  "userId": 1
}
```

**Errors:**
- 400: Validation error
- 401: Unauthorized

---

#### PUT /api/medications/:id
Update an existing medication.

**Parameters:**
- `id` (path): Medication ID (integer)

**Request Body:**
```json
{
  "name": "string (optional)",
  "dosage": "number (optional)",
  "currentPills": "number (optional)",
  "lowStockThreshold": "number (optional)",
  "sideEffects": "string (optional)"
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Aspirin Updated",
  "currentPills": 20
}
```

---

#### POST /api/medications/:id/deduct
Deduct pills when medication is taken.

**Parameters:**
- `id` (path): Medication ID (integer)

**Request Body:**
```json
{
  "quantity": 1
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Aspirin",
  "currentPills": 24
}
```

---

#### DELETE /api/medications/:id
Delete a medication.

**Parameters:**
- `id` (path): Medication ID (integer)

**Response (200):**
```json
{
  "message": "Medication deleted successfully"
}
```

---

### Schedule Endpoints

#### GET /api/schedules
Get all medication schedules.

**Response (200):**
```json
[
  {
    "id": 1,
    "medicationId": 1,
    "intakeTime": "08:00:00",
    "frequency": "daily",
    "doseQuantity": 1,
    "userId": 1
  }
]
```

---

#### POST /api/schedules
Create a new medication schedule.

**Request Body:**
```json
{
  "medicationId": "number (required)",
  "intakeTime": "string (HH:MM:SS format, required)",
  "frequency": "string (daily|twice_daily|weekly|as_needed, required)",
  "doseQuantity": "number (required)",
  "userId": "number (required)"
}
```

**Response (201):**
```json
{
  "id": 1,
  "medicationId": 1,
  "intakeTime": "08:00:00",
  "frequency": "daily",
  "doseQuantity": 1
}
```

---

### Alert Endpoints

#### GET /api/alerts/user/:userId
Get all drug interaction alerts for a user.

**Parameters:**
- `userId` (path): User ID (integer)

**Response (200):**
```json
[
  {
    "id": 1,
    "medication1Id": 1,
    "medication2Id": 2,
    "severity": "high",
    "message": "May cause increased bleeding risk",
    "userId": 1
  }
]
```

---

#### POST /api/alerts
Create a new drug interaction alert.

**Request Body:**
```json
{
  "medication1Id": "number (required)",
  "medication2Id": "number (required)",
  "severity": "string (low|moderate|high|critical, required)",
  "message": "string (required)",
  "userId": "number (required)"
}
```

---

### Health Check Endpoint

#### GET /api/health
Check API and database health status.

**Response (200):**
```json
{
  "ok": true,
  "database": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  face_descriptor TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Medications Table
```sql
CREATE TABLE medications (
  medication_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dosage INTEGER NOT NULL,
  pills_per_box INTEGER NOT NULL,
  current_pills INTEGER NOT NULL,
  low_stock_threshold INTEGER DEFAULT 5,
  side_effects TEXT,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Medication_Schedules Table
```sql
CREATE TABLE medication_schedules (
  schedule_id SERIAL PRIMARY KEY,
  medication_id INTEGER REFERENCES medications(medication_id) ON DELETE CASCADE,
  intake_time TIME NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  dose_quantity INTEGER DEFAULT 1,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Interaction_Alerts Table
```sql
CREATE TABLE interaction_alerts (
  alert_id SERIAL PRIMARY KEY,
  medication1_id INTEGER REFERENCES medications(medication_id) ON DELETE CASCADE,
  medication2_id INTEGER REFERENCES medications(medication_id) ON DELETE CASCADE,
  severity VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Authentication

MediTrack uses JWT (JSON Web Tokens) for authentication.

### Getting a Token
1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Receive `accessToken` in response

### Using the Token
Include in all protected endpoint requests:
```
Authorization: Bearer <your_access_token>
```

### Token Expiration
- Default: 1 hour
- Configurable via `JWT_EXPIRES_IN` environment variable

---

## Error Handling

### Standard Error Response Format
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found
- **500**: Internal Server Error

### Common Errors

#### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```
**Solution**: Include valid JWT token in Authorization header

#### 400 Validation Error
```json
{
  "statusCode": 400,
  "message": ["username must be longer than 3 characters"],
  "error": "Bad Request"
}
```
**Solution**: Check request body matches required format

---

## GraphQL API

### Endpoint
`http://localhost:4000/graphql`

### Example Queries

#### Get All Medications
```graphql
query {
  medications {
    id
    name
    dosage
    currentPills
  }
}
```

#### Get User by ID
```graphql
query {
  user(id: 1) {
    id
    username
    email
  }
}
```

#### Create Medication (Mutation)
```graphql
mutation {
  createMedication(input: {
    name: "Aspirin"
    dosage: 500
    pillsPerBox: 30
    currentPills: 30
    lowStockThreshold: 5
    userId: 1
  }) {
    id
    name
    dosage
  }
}
```

---

## Third-Party Libraries

### Backend
- **@nestjs/core**: NestJS framework
- **@nestjs/typeorm**: Database ORM integration
- **@nestjs/jwt**: JWT authentication
- **@nestjs/passport**: Authentication strategies
- **@nestjs/graphql**: GraphQL integration
- **@nestjs/swagger**: API documentation
- **bcrypt**: Password hashing
- **pg**: PostgreSQL driver
- **class-validator**: Input validation
- **helmet**: Security headers

### Frontend
- **react**: UI library
- **@reduxjs/toolkit**: State management
- **react-bootstrap**: UI components
- **axios**: HTTP client
- **@apollo/client**: GraphQL client
- **recharts**: Data visualization
- **date-fns**: Date formatting

---

## Testing the Application

### Manual Testing

1. **Start Backend**
```bash
cd api-nest
npm run start:dev
```

2. **Start Frontend**
```bash
cd frontend
npm run dev
```

3. **Test Endpoints**
- Visit Swagger UI: http://localhost:4000/api/docs
- Use "Try it out" feature for each endpoint
- Or use Postman/Insomnia with provided examples

### Testing Flow
1. Register a user
2. Login to get JWT token
3. Create medications
4. Create schedules
5. Test voice commands
6. Check dashboard analytics

---

## Support

For issues or questions:
- Check Swagger documentation: http://localhost:4000/api/docs
- Review this documentation
- Check application logs in terminal

---

**Version**: 2.0.0  
**Last Updated**: December 2024
