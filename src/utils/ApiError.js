// Export a class called ApiError that extends the Error class
class ApiError extends Error {
  // Constructor for the ApiError class
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    data = null,
    stack = ""
  ) {
    // Call the constructor of the parent class (Error) with the message parameter
    super(message);
    // Assign the statusCode parameter to the statusCode property of the ApiError class
    this.statusCode = statusCode;
    // Assign the message parameter to the message property of the ApiError class
    this.message= message;
    // Assign the value null to the data property of the ApiError class
    this.data = data;
    // Assign the errors parameter to the errors property of the ApiError class
    this.errors = errors; // Fixed assignment
    // Assign the value false to the success property of the ApiError class
    this.success = false;
   

    if (stack) {
      this.stack = stack;
    } else {
      // Assign the stack parameter to the stack property of the ApiError class
      Error.captureStackTrace(this, this.constructor);
    }
    // Call the captureStackTrace method of the Error class with the ApiError class and the constructor as parameters
  }
}
export { ApiError };
