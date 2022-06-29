const jwt = require("jsonwebtoken");

const createToken = {
  activation: (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION, { expiresIn: "5m" });
  },
  refresh: (payload) => {
    return jwt.sign(payload, process.env.REFRESH, { expiresIn: "24h" });
  },
  access: (payload) => {
    return jwt.sign(payload, process.env.ACCESS, { expiresIn: "15m" });
  },
};

module.exports = createToken;
