const bcrypt = require("bcrypt");

module.exports = {
  async hash(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      return hashed;
    } catch (error) {
      console.log(error);
    }
  },

  async verify(password, hashed) {
    try {
      const isMatch = await bcrypt.compare(password, hashed);
      return isMatch;
    } catch (error) {
      console.log(error);
    }
  },
};
