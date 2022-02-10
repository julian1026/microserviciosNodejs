function success(req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || "";
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: message,
  });
}

function error(req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal Server Error";
  res.send({
    error: true,
    status: statusCode,
    body: statusMessage,
  });
}

module.exports = { success, error };
