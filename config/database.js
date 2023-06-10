const mongoose = require("mongoose");
const uri = process.env.URI;

mongoose.connect(uri, { autoIndex: false });
const connection = mongoose.connection;

connection
  .on("open", () => console.log("connected to mongodb"))
  .on("close", () => console.log("disconnected!"))
  .on("error", () => console.log("error"));
