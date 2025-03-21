function handleError(res, message, statusCode = 500) {
    res.status(statusCode).json({ message });
  }
  
  export { handleError };
  