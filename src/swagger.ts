// src/swagger.ts

import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:3000", // Altere para o URL da sua API
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "uuid",
              description: "ID do usuário",
            },
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              description: "Email do usuário",
            },
          },
          required: ["name", "email"],
        },
      },
    },
  },
  apis: ["./src/routes/index.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
