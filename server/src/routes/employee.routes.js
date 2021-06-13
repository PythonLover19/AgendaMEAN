const express = require("express");
const router = express.Router();
const employee = require("../controllers/employee.controllers");
const { check } = require('express-validator/check');



const valid_employee = [
    check('nombre', 'El nombre indicado debe tener al menos 3 caracteres y no puede incluir números')
    .isLength({ min: 3 })
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
    check('apellido', 'Los apellidos indicados deben tener al menos 3 caracteres y no pueden incluir números')
    .isLength({ min: 3 })
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
    check('edad', 'La edad indicada debe estar comprendida entre 0 y 125')
    .isFloat({ min: 0, max: 125 }),
    check('dni', 'El dni indicado debe contener 9 caracteres alfanuméricos')
    .isLength({ min: 9, max: 9 })
    .isAlphanumeric(),
    check('cumpleanos', 'El cumpleaños indicado debe especificarse en formato aaaa-mm-dd')
    .isISO8601(),
    check('color', 'El color favorito indicado debe tener al menos 3 caracteres y no puede incluir números')
    .isLength({ min: 3 })
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
    check('sexo')
    .isIn(['hombre','mujer','otro','no especificado'])
];





router.get("/", employee.getEmployees);

router.post("/", valid_employee, employee.createEmployee);

router.get("/:id", employee.getEmployee);

router.put("/:id", valid_employee, employee.editEmployee);

router.delete("/:id", employee.deleteEmployee);

module.exports = router;
