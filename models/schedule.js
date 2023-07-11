//utils/config
const knex = require("../config/knex");

module.exports = {
  //add/store data
  async store(payload) {
    const { date, destination, purpose,  activity } = payload;
    try {
      const [sched_id] = await knex("tbl_schedule_main").insert({
        date: date,
        destination: destination,
        purpose: purpose,
      });

      sched_id;

      const result = await knex("tbl_schedule_sub").insert({
        sched_main_id: sched_id,
        activity: activity,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
