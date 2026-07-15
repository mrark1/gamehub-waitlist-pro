export const successResponse = (
  res,
  message,
  data = null,
  status = 200
) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
    requestId: res.req.requestId,

timestamp: new Date().toISOString()
  });
};

export const errorResponse = (
  res,
  message,
  errors = [],
  status = 500
) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    errors,
    requestId: res.req.requestId,

timestamp: new Date().toISOString()
  });
};