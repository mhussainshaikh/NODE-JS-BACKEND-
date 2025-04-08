// this is try catch method ///
export const asyncHandler = (fn) => {
 return  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.code || 500).json({
        success: false,
        message: err.message,
      });
    }
  };
};


// this is .then and catch metrhod ///

// const asyncHandler=(requestHandler)=>{
// (req,res,next)=>{
// Promise.resolve(requestHandler(req,res,next))
// .catch((err)=>next(err))
// }
// }

