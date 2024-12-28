export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  UNKNOWN_ERROR: {
    code: 500,
    message: "Something went wrong",
  },
  REQUIRED: {
    code: 201,
    message: "is required",
  },
  INVALID: {
    code: 202,
    message: "is invalid input format",
  },
  NOT_FOUND: {
    code: 203,
    message: "is not found",
  },
  ALREADY_EXISTS: {
    code: 204,
    message: "is already exists"
  },
  TOKEN_REQUIRED: {
    code: 400,
    message: "Authentication token is required",
  },
  INVALID_TOKEN: {
    code: 401,
    message: "Authentication token is invalid",
  },
};
