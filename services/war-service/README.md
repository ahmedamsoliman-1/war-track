# 🌐 War Service

This is the War Service component of the Global War Information System. It is responsible for managing historical, ongoing, and predicted wars, providing a RESTful API for CRUD operations on war data.

## Project Structure

```
war-service
├── src
│   ├── controllers        # Contains request handlers for war-related operations
│   ├── routes             # Defines the routes for the API
│   ├── services           # Contains business logic for managing war data
│   ├── models             # Defines the data models and interfaces
│   ├── middlewares        # Contains middleware functions for authentication and validation
│   ├── utils              # Utility functions for database operations
│   ├── app.ts             # Main application file
│   └── server.ts          # Entry point for the application
├── tests                  # Directory for test files
├── Dockerfile             # Docker configuration for containerization
├── docker-compose.yml     # Docker Compose configuration for multi-container setup
├── tsconfig.json          # TypeScript configuration file
├── package.json           # npm configuration file
└── .env                   # Environment variables for the application
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd war-service
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables.

4. **Run the application:**
   ```
   npm start
   ```

5. **Run tests:**
   ```
   npm test
   ```

## API Endpoints

- `GET /wars` - List all wars
- `GET /wars/:id` - Get war details
- `POST /wars` - Create new war (admin only)
- `PUT /wars/:id` - Update war (admin only)
- `DELETE /wars/:id` - Delete war (admin only)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.