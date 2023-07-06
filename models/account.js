//libraries/utils
const knex = require("../config/knex");

//models
const { verify } = require("../models/login");

module.exports = {
  async list() {
    try {
      const result = await knex("tbl_account").select({
        id: "account_id",
        title: "title",
        fname: "fname",
        lname: "lname",
        gender: "gender",
        age: "age",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async store(payload) {
    const { title, fname, lname, gender, age, email } = payload;
    try {
      const isMatch = await verify(email);

      if (isMatch) {
        return "Email already exist!";
      } else {
        const [account_id] = await knex("tbl_account").insert({
          title: title,
          fname: fname,
          lname: lname,
          gender: gender,
          age: age,
        });
        return account_id;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async update(payload) {
    const { id, title, fname, lname, gender, age } = payload;
    try {
      const result = await knex("tbl_account")
        .update({
          title: title,
          fname: fname,
          lname: lname,
          gender: gender,
          age: age,
        })
        .where("account_id", id);

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
