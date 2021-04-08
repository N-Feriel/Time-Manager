const jwt = require("jsonwebtoken");
const { PRIVATE_JWT } = process.env;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No Token provided");

  try {
    const decoded = jwt.verify(token, PRIVATE_JWT);
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
}

module.exports = auth;
