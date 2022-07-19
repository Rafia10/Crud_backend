const express = require("express");
const EmployeeController = require("./Controller/EmployeeController");
const cors = require("cors");
let app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use("/employees", EmployeeController);

module.exports = app;
