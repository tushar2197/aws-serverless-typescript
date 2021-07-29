export default {
  openapi: "3.0.3",
  info: {
    version: 1.0,
    title: "Wisecaller APIs",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Authentication Service"],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mobileNo: {
                    type: "string",
                  },
                },
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "New user created",
          },
          500: {
            description: "Invalid parameters",
          },
          422: {
            description: "Validation Error",
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Authentication Service"],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mobileNo: {
                    type: "string",
                  },
                },
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User login",
          },
          500: {
            description: "Invalid parameters",
          },
          422: {
            description: "Validation Error",
          },
        },
      },
    },
    "/api/v1/auth/verify-otp": {
      post: {
        tags: ["Authentication Service"],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  otp: {
                    type: "string",
                  },
                },
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "OTP verified",
          },
          500: {
            description: "Invalid parameters",
          },
          422: {
            description: "Validation Error",
          },
        },
      },
    },
    "/api/v1/user/get-profile": {
      get: {
        tags: ["Authentication Service"],
        security: {
          bearerAuth: [],
        },
        parameters: [],
        requestBody: [],
        responses: {
          200: {
            description: "User profile details",
          },
          500: {
            description: "Invalid parameters",
          },
          422: {
            description: "Validation Error",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/v1/user/update-profile": {
      put: {
        tags: ["Authentication Service"],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User profile update",
          },
          500: {
            description: "Invalid parameters",
          },
          422: {
            description: "Validation Error",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        description: "JWT Bearer token",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
