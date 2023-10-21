const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const EmployeesRoute = require("./routes/Employees");

// create out express app
const app = express();

// app.use(cors);

// handle CORS + middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, HEAD, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// database
const uri =
  "mongodb+srv://jo:3SlWxezCzBrDfZai@clusterclassroom.ti5ggso.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/employees", cors(), EmployeesRoute);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
