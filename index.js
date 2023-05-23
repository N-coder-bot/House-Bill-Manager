const express = require("express");
const app = express();
const USERS = require("./Users");
const moment = require("moment");

const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const PORT = process.env.PORT || 8000;
const uri =
  "mongodb+srv://naman:D-QU-G3yG_jzSmJ@users.qaljg9a.mongodb.net/?retryWrites=true&w=majority";

//setting middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connecting to mongodb database.
mongoose.connect(uri);
const connection = mongoose.connection;
connection
  .on("open", () => console.log("connected to mongodb"))
  .on("close", () => console.log("disconnected!"))
  .on("error", () => console.log("error"));

//User Routes
app.use("/api/users", require("./routes/api/users"));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
