const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NaariKavach API",
      version: "1.0.0",
      description: "API documentation for NaariKavach (Women Safety Project)",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // 🔧 Update in production
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Auto-generate docs from route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

// Swagger setup function
const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger docs available at http://localhost:5000/api/docs");
};

module.exports = setupSwagger;
