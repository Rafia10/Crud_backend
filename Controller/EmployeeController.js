const express = require("express");
const { isValidObjectId, default: mongoose } = require("mongoose");
const { Employee } = require("../Model/employees");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const router = express.Router();

router.get("/", async (req, res) => {
  const emp = await Employee.find();
  // console.log(emp);
  if (!emp) {
    return res.json({ error: "No Entry found" });
  }
  res.json(emp);
});

router.get("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "no record with given " + `${req.params.id}` });
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.json({ error: "record not found" });
  }
  res.json(employee);
});

router.post("/", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: "Invalid Email" });
  }
  const existingUser = await Employee.findOne({ name: req.body.name });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username already exist please change" });
  }

  const emp = new Employee({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    office: req.body.office,
  });
  await emp.save();
  res.status(201).json(emp);
});

router.post("/username", async (req, res) => {
  const employee = await Employee.findOne({ name: req.body.name });
  if (employee) {
    return res.json({
      message: "Username already is in use",
    });
  }
  res.status(201).json({ available: true });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  let emp = {
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true }
  );
  if (!employee) {
    return res.status(400).json({ error: "No record found to update" });
  }
  res.status(201).json({ message: "Record successfully updated", data: emp });
});

router.delete("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "no record with given " + `${req.params.id}` });
  }

  const employee = await Employee.findByIdAndRemove(req.params.id);
  if (!employee) {
    res.json({ error: "record not found" });
  }
  res.json({ emp: { msg: "Record Successfully deleted", employee } });
});

router.delete("/", async (req, res) => {
  const employee = await Employee.remove(req.params.id);
  if (!employee) {
    res.json({ error: "record not found" });
  }

  res.json({ emp: { msg: "Records Successfully deleted", employee } });
});
module.exports = router;
