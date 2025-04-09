// Export a class called ApiError that extends the Error class
 class ApiError extends Error {
    // Constructor for the ApiError class
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        // Call the constructor of the parent class (Error) with the message parameter
        super(message);
        // Assign the statusCode parameter to the statusCode property of the ApiError class
        this.statusCode = statusCode;
        // Assign the errors parameter to the errors property of the ApiError class
        this.errors = errors;  // Fixed assignment
        // Assign the value false to the success property of the ApiError class
        this.success = false;
        this.data = null;

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