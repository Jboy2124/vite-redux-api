require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const Routes = require("./routes/main-route");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Routes);

app.listen(port, () => {
  console.log("Server is running at port: ", port);
});
