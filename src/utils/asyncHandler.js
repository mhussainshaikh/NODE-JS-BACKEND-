// this is try catch method ///
// this is higher order function which takes a function as an argument and returns a new function
// This function takes a function as an argument and returns an asynchronous function that takes three arguments: req, res, and next.
 const asyncHandler = (fn) => {  
 // This function is called when the asynchronous function is called.
 return  async (req, res, next) => {
    try {
      // This line calls the function passed as an argument to asyncHandler.
      await fn(req, res, next);
    } catch (err) {
      // This line sets the status of the response to the error code or 500 if no error code is provided.
      res.status(err.code || 500).json({
        // This line sets the success property of the response to false and the message property to the error message.
        success: false,
        message: err.message,
      });
    }
  };
};

// This line exports the asyncHandler function so it can be used in other files.
export { asyncHandler };
// this is .then and catch method ///

// const asyncHandler=(requestHandler)=>{
// (req,res,next)=>{
// Promise.resolve(requestHandler(req,res,next))
// .catch((err)=>next(err))
// }
// }

