const moment = require("moment");

const USERS = [
  {
    id: 1,
    name: "Naman Jain",
    email: "naman3878@gmail.com",
    password: "abcde",
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    id: 2,
    name: "Akshay Jain",
    email: "ash317@gmail.com",
    password: "abcde",
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    id: 3,
    name: "Mamta Jain",
    email: "mumma1199@gmail.com",
    password: "mumma123",
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    id: 4,
    name: "Ramesh Jain",
    email: "rameshJain9988@gmail.com",
    password: "ramesh123",
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
];

module.exports = USERS;
