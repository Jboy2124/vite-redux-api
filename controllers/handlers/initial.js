const Initial = require("../../models/initial");

module.exports = {
  initial(req, res) {
    try {
      const greetings = Initial.initial();
      res.json(greetings);
    } catch (error) {
      console.log(error);
    }
  },
};
