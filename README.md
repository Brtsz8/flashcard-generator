# Flashcard Generator

A full-stack web application for creating, managing, and studying flashcards. The project combines classic CRUD functionality with JWT authentication, OAuth/OpenID Connect login providers, role-based access control, and AI-powered flashcard generation.

---

# Features

* Local user registration and login
* OAuth login with:

  * Google
  * Facebook
  * GitHub
* JWT-based authentication
* Role-Based Access Control (RBAC)
* Admin panel
* Create, edit, and delete decks
* Create, edit, and delete flashcards
* Flashcard study mode
* Search for decks and flashcards
* AI-powered flashcard generation using Gemini
* Protected backend API routes

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* React Hot Toast
* @react-oauth/google

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JSON Web Token (JWT)
* bcryptjs
* google-auth-library
* Gemini API

## Infrastructure

* Docker
* Docker Compose

---

# Architecture

The application follows a **SPA + REST API** architecture.

* **Frontend** handles UI rendering and communication with the backend
* **Backend** manages business logic, authentication, authorization, and database operations
* **PostgreSQL** stores users, decks, flashcards, and roles
* **Prisma ORM** provides database access and schema management

---

# Security Features

## JWT Authentication

After successful login, users receive a signed JWT token containing:

* user ID
* user role
* expiration time

Protected API endpoints require a valid token in the `Authorization` header.

---

## RBAC (Role-Based Access Control)

The application supports two roles:

### USER

Can:

* manage personal decks
* manage personal flashcards
* use study mode
* generate AI flashcards

### ADMIN

Can:

* view all users
* delete users
* view all decks
* delete any deck
* access admin dashboard

---

## OAuth / OpenID Connect

Users can authenticate using external identity providers:

* Google
* Facebook
* GitHub

OAuth tokens are verified on the backend before issuing a local JWT token.

---

# AI Integration

The application integrates with **Google Gemini API** to automatically generate flashcards from:

* notes
* summaries
* study materials
* prompts entered by the user

---

# Project Structure

```txt
flashcard-generator/
├── client/      # React frontend
└── server/      # Node.js backend
```

## Frontend Structure

```txt
client/src/
├── components/
├── hooks/
├── layouts/
├── pages/
├── services/
├── types/
└── ...
```

## Backend Structure

```txt
server/src/
├── config/
├── middleware/
├── modules/
│   ├── auth/
│   ├── admin/
│   ├── decks/
│   ├── flashcards/
│   └── ai/
├── routes/
└── server.js
```

---

# Requirements

* Node.js 18+
* npm
* Docker & Docker Compose
* PostgreSQL
* Google OAuth Developer Account
* Facebook Developer Account
* GitHub OAuth App
* Gemini API Key

---

# Environment Variables

## Backend `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/flashcards"

JWT_SECRET="your_jwt_secret"

GOOGLE_CLIENT_ID="your_google_client_id"

FACEBOOK_APP_ID="your_facebook_app_id"
FACEBOOK_APP_SECRET="your_facebook_app_secret"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GEMINI_API_KEY="your_gemini_api_key"
```

## Frontend `.env`

```env
VITE_API_URL="http://localhost:5050/api"

VITE_GOOGLE_CLIENT_ID="your_google_client_id"
```

---

# Installation

## Clone repository

```bash
git clone <repository-url>
cd flashcard-generator
```

---

## Backend Setup

```bash
cd server

npm install

npx prisma migrate dev

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Docker Setup

```bash
docker compose up --build
```

---

# Available Routes

## Frontend Pages

| Route             | Description       |
| ----------------- | ----------------- |
| `/register`       | User registration |
| `/login`          | User login        |
| `/dashboard`      | User dashboard    |
| `/deck/:id`       | Deck details      |
| `/deck/:id/study` | Study mode        |
| `/admin`          | Admin dashboard   |

---

# API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| POST   | `/api/auth/google`   |
| POST   | `/api/auth/facebook` |
| POST   | `/api/auth/github`   |
| GET    | `/api/auth/me`       |

---

## Decks

| Method | Endpoint     |
| ------ | ------------ |
| GET    | `/api/decks` |
| POST   | `/api/decks` |

---

## Flashcards

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/flashcards/:deckId` |
| POST   | `/api/flashcards`         |
| PUT    | `/api/flashcards/:id`     |
| DELETE | `/api/flashcards/:id`     |

---

## AI

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/ai/generate` |

---

## Admin

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/api/admin/users`     |
| DELETE | `/api/admin/users/:id` |
| GET    | `/api/admin/decks`     |
| DELETE | `/api/admin/decks/:id` |

---

# Authentication Flow

## Local Login

1. User submits email and password
2. Backend validates credentials
3. JWT token is generated
4. Frontend stores token
5. Protected requests include token in headers

---

## OAuth Login

1. User selects OAuth provider
2. Provider authenticates user
3. Frontend receives OAuth credential/token
4. Backend verifies token
5. User account is created or matched
6. Backend issues local JWT token

---

# Security Considerations

The project includes:

* JWT signature verification
* Role validation on backend
* Protected API routes
* OAuth token verification
* Environment-based secret management
* Separation between OAuth identity and local authorization

---

# Purpose of the Project

The goal of the project was to build a modern web application demonstrating practical implementation of:

* authentication systems
* OAuth 2.0 / OpenID Connect
* role-based authorization
* REST API security
* AI integration in web applications

The project was created as part of the **Introduction to Cybersecurity** course.

---

# Future Improvements

Planned features:

* file upload support for AI analysis
* refresh token authentication
* email verification
* password reset
* rate limiting
* audit logs
* deck sharing system
* collaborative learning

---

# Author

Created for the **Introduction to Cybersecurity** university course.
