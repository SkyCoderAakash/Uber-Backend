# User Clone Application

## Overview
The User Clone Application provides a RESTful API for managing users and captains, including registration, login, profile retrieval, and logout. This application is designed to handle secure user authentication and session management using JWT tokens.

---

## Features
- **User and Captain Management:** Separate APIs for users and captains.
- **Registration and Login:** Securely register and authenticate users and captains.
- **Profile Management:** Retrieve authenticated user or captain profile information.
- **Logout:** Clear session by removing the token cookie.
- **Secure Authentication:** Uses hashed passwords and JWT for secure authentication.

---

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** Bcrypt.js
- **Cookie Management:** HttpOnly Cookies

---

## Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-clone-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   NODE_ENV=development
   TOKEN_EXPIRY=7 # in days
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run at `http://localhost:5000`.

---

## API Endpoints

### Base URLs
- User: `/api/v1/user`
- Captain: `/api/v1/captain`

### User Endpoints

#### 1. Register User
- **Endpoint:** `POST /register`
- **Description:** Register a new user.
- **Payload:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### 2. Login User
- **Endpoint:** `POST /login`
- **Description:** Authenticate a user and generate a session token.
- **Payload:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### 3. Get User Profile
- **Endpoint:** `GET /profile`
- **Description:** Fetch the authenticated user's profile.
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```

#### 4. Logout User
- **Endpoint:** `GET /logout`
- **Description:** Logout the user by clearing the session cookie.

### Captain Endpoints

#### 1. Register Captain
- **Endpoint:** `POST /register`
- **Description:** Register a new captain.
- **Payload:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Red",
      "capacity": 4,
      "plate": "ABC-123",
      "vehicleType": "Car"
    }
  }
  ```

#### 2. Login Captain
- **Endpoint:** `POST /login`
- **Description:** Authenticate a captain and generate a session token.
- **Payload:**
  ```json
  {
    "email": "jane.smith@example.com",
    "password": "password123"
  }
  ```

#### 3. Get Captain Profile
- **Endpoint:** `GET /profile`
- **Description:** Fetch the authenticated captain's profile.
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```

#### 4. Logout Captain
- **Endpoint:** `GET /logout`
- **Description:** Logout the captain by clearing the session cookie.

---

## Folder Structure
```
user-clone-application
├── controllers
│   ├── userController.js       # Contains user-related logic
│   ├── captainController.js    # Contains captain-related logic
├── middlewares
│   ├── userAuth.js             # Authentication middleware for users
│   ├── captainAuth.js          # Authentication middleware for captains
├── models
│   ├── userModel.js            # Mongoose schema for User
│   ├── captainModel.js         # Mongoose schema for Captain
├── routes
│   ├── userRoutes.js           # User routes
│   ├── captainRoutes.js        # Captain routes
├── utils
│   ├── CreateResponse.js       # Standardized API response utility
├── constants.js                # Centralized error and success messages
├── server.js                   # Application entry point
├── .env                        # Environment variables
├── package.json                # Node.js dependencies
```

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or raise an issue.

---

## License
This project is licensed under the MIT License.

