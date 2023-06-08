const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@users.qaljg9a.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { autoIndex: false });
const connection = mongoose.connection;

connection
  .on("open", () => console.log("connected to mongodb"))
  .on("close", () => console.log("disconnected!"))
  .on("error", () => console.log("error"));
