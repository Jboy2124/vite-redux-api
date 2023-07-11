//model/controllers

//config/utils
const knex = require("../config/knex");
const { hash, verify } = require("../utils/bcrypt");
const { signin } = require("../utils/jwt");

module.exports = {
  async list() {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // async userLogin(payload) {
  //   const { email, password } = payload;
  //   try {
  //     const result = await knex("tbl_login as login")
  //       .select({
  //         id: "login.account_id",
  //         fname: "account.fname",
  //         lname: "account.lname",
  //         email: "login.email",
  //       })
  //       .leftJoin(
  //         "tbl_account as account",
  //         "account.account_id",
  //         "login.account_id"
  //       )
  //       .where("login.email", email);

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  async userLogin({ email, password }) {
    let data;
    try {
      const result = await knex("tbl_login")
        .select({
          id: "account_id",
          email: "email",
          password: "password",
        })
        .where("email", email);

      if (result.length > 0) {
        const isMatch = await verify(password, result[0]?.password);

        if (isMatch) {
          const res = await knex("tbl_account as account")
            .select({
              fname: "fname",
              lname: "lname",
            })
            .leftJoin(
              "tbl_login as login",
              "login.account_id",
              "account.account_id"
            )
            .where("account.account_id", result[0]?.id);

          data = [
            {
              data: {
                fname: res[0]?.fname,
                lname: res[0]?.lname,
                email: result[0]?.email,
              },
              token: await signin({
                fname: res[0]?.fname,
                lname: res[0]?.lname,
                email: result[0]?.email,
              }),
            },
          ];
        } else {
          data = { error: "Invalid password" };
        }
      } else {
        data = { error: "Invalid email credential" };
      }

      return data;
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
