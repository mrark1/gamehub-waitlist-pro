const errorHandler = (err, req, res, next) => {

  console.error(err);

  res.status(err.status || 500).json({

    success: false,

    status: err.status || 500,

    message: err.message || "Internal Server Error"

  });

};

export default errorHandler;