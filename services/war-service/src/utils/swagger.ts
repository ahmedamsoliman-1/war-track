import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "War Service API",
      version: "1.0.0",
      description: "API documentation for the War microservice",
    },
    components: {
      schemas: {
        War: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "World War II"
            },
            description: {
              type: "string",
              example: "A global war that lasted from 1939 to 1945."
            },
            startDate: {
              type: "string",
              format: "date",
              example: "1939-09-01"
            },
            endDate: {
              type: "string",
              format: "date",
              example: "1945-09-02"
            },
            involvedCountries: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["Germany", "United Kingdom", "United States"]
            },
            casualties: {
              type: "integer",
              example: 60000000
            },
            relatedWars: {
              type: "array",
              items: {
                type: "string"
              },
              example: []
            },
            geoData: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  example: "Polygon"
                },
                coordinates: {
                  type: "array",
                  items: {
                    type: "array",
                    items: {
                      type: "array",
                      items: {
                        type: "number"
                      }
                    }
                  }
                }
              }
            }
          },
          required: ["title"]
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
});
