//libraries
const joi = require("joi");

//models
const Account = require("../../models/account");
const Login = require("../../models/login");

module.exports = {
  async get(req, res) {
    try {
      const response = await Account.list();
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  async patch(req, res) {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string().allow("").optional(),
      fname: joi.string().allow("").optional(),
      lname: joi.string().allow("").optional(),
      gender: joi.string().allow("").optional(),
      age: joi.number().allow("").optional(),
    });
    try {
      const data = await schema.validateAsync(req.body);
      const response = await Account.update(data);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  async post(req, res) {
    const schema = joi.object({
      title: joi.string().allow("").optional(),
      fname: joi.string().required(),
      lname: joi.string().allow("").optional(),
      gender: joi.string().allow("").optional(),
      age: joi.number().allow("").optional(),
      email: joi.string().required(),
      password: joi.string().required(),
    });
    try {
      const data = await schema.validateAsync(req.body);
      const response = await Account.store(data);
      if (isNaN(response)) {
        res.json(response);
      } else {
        const login_res = await Login.store(response, {
          email: data.email,
          password: data.password,
        });

        res.json(login_res);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async profileImage(req, res) {
    res.json("Image upload");
  },
};
