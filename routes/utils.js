const jwt = require("jsonwebtoken");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "missingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next();
  }
  next();
};

module.exports = { requireUser, authRequired };
