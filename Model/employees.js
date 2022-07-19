const mongoose = require("mongoose");
const Employee = mongoose.model("Employee", {
  name: { type: String },
  email: { type: String },
  position: { type: String },
  office: { type: String },
});

module.exports = { Employee };
