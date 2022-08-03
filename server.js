require("dotenv").config();
const mongoose = require("mongoose");

//UncaughtException Error handling
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit();
});
const app = require("./app");

//Database Connection
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("connected");
});

//server start
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`server started port ${port}`);
});

//Unhandled Rejection Error handling
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
