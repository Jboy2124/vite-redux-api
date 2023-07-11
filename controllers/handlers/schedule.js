//libraries
const joi = require("joi");

//models
const Schedule = require("../../models/schedule");

module.exports = {
  async post(req, res) {
    const schema = joi.object({
      date: joi.date().required(),
      destination: joi.string().required(),
      purpose: joi.string().allow("").optional(),
    //   activity: joi.object().allow(null).allow("").optional(),
    });

    try {
      const data = await schema.validateAsync(req.body);
      const response = await Schedule.store(data);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
