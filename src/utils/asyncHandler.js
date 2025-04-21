// This function takes a request handler as an argument and returns an async function
const asyncHandler = (requestHandler) => {
  // This async function takes three arguments: req, res, and next
  return async (req, res, next) => {
    try {
      // The request handler is called with the three arguments
      await requestHandler(req, res, next);
    } catch (err) {
      // If an error is thrown, it is logged to the console
      console.error("Async Handler Error:", err);

      // The status code is determined by checking if the error has a statusCode property
      const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
      // The message is determined by checking if the error has a message property
      const message = err.message || "Internal Server Error";

      // The response is sent with the status code, success property set to false, message, and error stack
      res.status(statusCode).json({
        success: false,
        message,
        error: err.stack,
      });
    }
  };
};

export { asyncHandler };
