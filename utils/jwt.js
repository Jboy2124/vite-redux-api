require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async signin(payload) {
    try {
      const token = jwt.sign(
        { data: payload },
        process.env.JWT_ACCESS_SECRET_KEY,
        {
          algorithm: "HS384",
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        }
      );

      return token;
    } catch (error) {
      console.log(error);
    }
  },
};
