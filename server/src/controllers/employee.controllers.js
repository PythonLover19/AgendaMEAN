const Employee = require("../models/employee.models");

const { validationResult } = require('express-validator');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  res.json(employees);
};

employeeCtrl.createEmployee = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
  }
  if(employeeCtrl.getEmployees() === null){
    next(new Error('La conexión no esta estabecida'));
    return;
  }

  const employee = new Employee({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    dni: req.body.dni,
    cumpleanos: req.body.cumpleanos,
    color: req.body.color,
    sexo: req.body.sexo

  });
  await employee.save();
  res.json({ status: "Empleado creado" });
};

employeeCtrl.getEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json(employee);
};

employeeCtrl.editEmployee = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });     
  }
  if(employeeCtrl.getEmployees() === null){
    next(new Error('La conexión no esta establecida'));
    return;
  }
  
  const { id } = req.params;
  await Employee.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Empleado actualizado" });
};

employeeCtrl.deleteEmployee = async (req, res, next) => {
  await Employee.findByIdAndRemove(req.params.id);
  res.json({ status: "Empleado eliminado" });
};

module.exports = employeeCtrl;
