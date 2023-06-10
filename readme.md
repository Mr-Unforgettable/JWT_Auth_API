# Project README

This is a basic Node.js authentication API using Express, MongoDB, and JSON Web Tokens (JWT). It provides endpoints for user registration, login, and a welcome message for authenticated users.

## Requirements

Make sure you have the following software installed:

- Node.js
- MongoDB or MongoDB Compass (for database management)
- Postman (for API testing)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

   ```
   npm install
   ```

4. Create a `.env` file in the project root and set the following environment variables:

   ```
   API_PORT=4001
   MONGO_URI=<your MongoDB connection URI>
   TOKEN_KEY=<your secret token key>
   ```

   Replace `<your MongoDB connection URI>` with your actual MongoDB connection string and `<your secret token key>` with your own secret key for signing JSON Web Tokens.

## Usage

To start the server, run the following command:

```
npm start
```

The server will start running at `http://localhost:4001`.

## Endpoints

- **POST /register** - Register a new user. Requires the following parameters in the request body: `first_name`, `last_name`, `email`, and `password`. Upon successful registration, a JSON response with the user object and a token will be returned.

- **POST /login** - Log in an existing user. Requires the following parameters in the request body: `email` and `password`. If the credentials are valid, a JSON response with the user object and a token will be returned.

- **GET /welcome** - A protected route that requires authentication. Sends a welcome message for authenticated users. Requires a valid JSON Web Token (JWT) to be included in the request headers as `x-access-token`.

Note: To access the protected `/welcome` endpoint, you need to include the token in the request headers. You can obtain the token by registering or logging in.

## Code Structure

- **database.js** - Connects to the MongoDB database using Mongoose.
- **user.js** - Defines the user schema using Mongoose.
- **auth.js** - Middleware function to verify the JWT token.
- **app.js** - Express application file containing the API routes and logic.
- **index.js** - Entry point file that starts the server.

Feel free to explore and modify the code as per your requirements.

## Testing

You can use a tool like Postman to test the API endpoints. Here are some example requests:

- **POST /register** - Register a new user:

  ```
  POST http://localhost:4001/register

  Body:
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

- **POST /login** - Log in an existing user:

  ```
  POST http://localhost:4001/login

  Body:
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

- **GET /welcome** - Access the protected welcome route:

  ```
  GET http://localhost:4001/welcome

  Headers:
  x-access-token: <token>
  ```

Replace `<token>` in the `x-access-token` header with the JWT token obtained from the registration or login response.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).