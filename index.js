const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const uri = `mongodb+srv://naman:${process.env.password}@users.qaljg9a.mongodb.net/?retryWrites=true&w=majority`;

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
