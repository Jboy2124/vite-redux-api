const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.BB_CONFIG_HOSTNAME,
    user: process.env.DB_CONFIG_USERNAME,
    password: process.env.DB_CONFIG_PASSwORD,
    database: process.env.DB_CONFIG_DATABASE,
    port: process.env.DB_CONFIG_PORT,
  },

  pool: { min: 0, max: 10 },
});

knex
  .raw("SELECT 1")
  .then(() => {
    console.log(`Database Port No.: ${process.env.DB_CONFIG_PORT}`);
  })
  .catch((error) => {
    console.log('Database is not connected!');
  });


module.exports = knex;
