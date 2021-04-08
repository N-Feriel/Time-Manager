const winston = require("winston");

module.exports = function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // res.status(500).send('something failed.')

  res.status(500).json({
    status: 500,
    message: "something failed.",
  });
};
