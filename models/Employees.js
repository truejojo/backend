const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  description: String,
});

module.exports = mongoose.model("employees", EmployeesSchema);
