// Export a class called ApiResponse
class ApiResponse {
    // Constructor for the ApiResponse class
    constructor(
        // Status code of the response
        statusCode,

        // Message of the response, default is "Successful Task"
        message = "Success",

        // Data of the response
        data=null,


    ) {
        // Set the status code of the response
        this.statusCode = statusCode;
        // Set the message of the response
        this.message = message;
        // Set the data of the response
        this.data = data;
        // Set the success property of the response to true if the status code is less than 400, otherwise false
        this.success= statusCode < 400;
    }
}

export { ApiResponse };