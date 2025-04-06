export const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message || "Internal Server Error",
      });
      // Or still use `next(error)` if you have a central error handler
    }
  };
};
// this is a middleware function that will handle any errors that occur during the execution of the request handler.
