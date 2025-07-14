import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API documentation for the User microservice"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "password123" }
          },
          required: ["email", "password"]
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
});
