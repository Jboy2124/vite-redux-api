//
const joi = require("joi");
const Login = require("../../models/login");

module.exports = {
  async signin(req, res) {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });
    try {
      const data = await schema.validateAsync(req.body);
      const response = await Login.userLogin(data);

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  async options(req, res) {
    const schema = joi.object({
      email: joi.string().required(),
    });

    try {
      const data = await schema.validateAsync(req.body);
      const response = await Login.verify(data.email);
      if (response) res.json([{ error: "Email already exist!" }]);
      else res.json([{ avail: "Email can be use!" }]);
    } catch (error) {
      console.log(error);
    }
  },
};
