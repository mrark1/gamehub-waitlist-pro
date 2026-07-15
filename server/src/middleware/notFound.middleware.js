const notFound = (req, res) => {

  res.status(404).json({

    success: false,

    status: 404,

    message: `Route '${req.originalUrl}' not found`

  });

};

export default notFound;