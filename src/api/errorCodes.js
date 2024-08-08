export const ErrorCodes = Object.freeze({
  NETWORK_ERROR: "NETWORK_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
});

export const ErrorMessages = Object.freeze({
  [ErrorCodes.NETWORK_ERROR]:
    "Network error occurred. Please check your connection.",
  [ErrorCodes.UNAUTHORIZED]: "You are not authorized to perform this action.",
  [ErrorCodes.FORBIDDEN]: "You do not have permission to access this resource.",
  [ErrorCodes.NOT_FOUND]: "The requested resource was not found.",
  [ErrorCodes.INTERNAL_SERVER_ERROR]:
    "An internal server error occurred. Please try again later.",
  [ErrorCodes.UNKNOWN_ERROR]: "An unknown error occurred. Please try again.",
});
