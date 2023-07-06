//config/utils
const knex = require("../config/knex");
const { hash } = require("../utils/bcrypt");

module.exports = {
  async list() {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  async userLogin(payload) {
    const { email, password } = payload;
    try {
      const result = await knex("tbl_login as login")
        .select({
          id: "login.account_id",
          fname: "account.fname",
          lname: "account.lname",
          email: "login.email",
        })
        .leftJoin(
          "tbl_account as account",
          "account.account_id",
          "login.account_id"
        )
        .where("login.email", email);

      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async verify(email) {
    try {
      const data = await knex("tbl_login")
        .select({
          login_id: "login_id",
          account_id: "account_id",
          email: "email",
        })
        .where("email", email);
      if (data.length > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
    }
  },

  async store(id, { email, password }) {
    try {
      const result = await knex("tbl_login").insert({
        account_id: id,
        email: email,
        password: await hash(password),
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
