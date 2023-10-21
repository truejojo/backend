const express = require("express");
const router = express.Router();
const Employees = require("../models/Employees");

/**
 * get all employees
 */
router.get("/", async (req, res) => {
  const employees = await Employees.find();
  res.json(employees);
});

/**
 * create a new employee
 */
router.post("/new", async (req, res) => {
  const newEmployee = new Employees({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    description: req.body.description,
  });

  const savedEmployee = await newEmployee.save();
  res.json(savedEmployee);
});

/**
 * find an employee by id
 */
router.get("/get/:id", async (req, res) => {
  const employee = await Employees.findById({ _id: req.params.id });
  res.json(employee);
});

/**
 * delete an employee by id
 */
router.delete("/delete/:id", async (req, res) => {
  const deleteEmployee = await Employees.findByIdAndDelete({
    _id: req.params.id,
  });
  res.json(deleteEmployee);
});

/**
 * update an employee by id
 */
router.put("/update/:id", async (req, res) => {
  const updateEmployee = await Employees.updateOne(
    { _id: req.params.id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      description: req.body.description,
    }
  );
  res.json(updateEmployee);
});

/**
 * search for result by options
 */
router.get("/search/", async (req, res) => {
  const query = JSON.parse(req.query.query);

  try {
    const employees = await Employees.find({
      $or: [
        // i-Option für Case-Insensitive-Suche
        {
          firstName: query.firstName && {
            $regex: query.firstName,
            $options: "i",
          },
        },
        {
          lastName: query.lastName && { $regex: query.lastName, $options: "i" },
        },
        { email: query.email && { $regex: query.email, $options: "i" } },
        {
          description: query.description && {
            $regex: query.description,
            $options: "i",
          },
        },
      ],
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;
