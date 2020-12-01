const { check, validationResult } = require('express-validator');

exports.validations = [
  //NAMES ARE NOT NULL

  check('name', 'Como raro ese nombre.').matches(
    /^[^\s]([a-zA-Z])+[\s]([a-zA-Z])+[^\s]$/
  ),
  //BIRTHDAY MUST BE IN THE FORMAT
  check('birthday', '¿Nació ayer o qué papá?').isDate(),
  //TEMPERATURE MUST BE IN THE FORMAT
  check(
    'temperature',
    'Sin temperatura no me entra viejo; el formato es el siguiente: 36.5, 37.0, 37.8'
  ).matches(/^([0-9]{2})+\.([0-9]{1})$/),
  //CHECK CLOTHES
  check(
    'clothingColor',
    'Con esas hilachas no me entra, se va cambiando de color.'
  )
    .optional()
    .isIn(['green', 'blue', 'red', 'black', 'white']),
  check('isPartying', 'No es étereo pai, ¿está adentro o no?').isBoolean(),
  check('role', '¿Cumpliendo el rol de payaso?').isIn([
    'dj',
    'partycipant',
    'bartender',
  ]),
];

exports.userValidator = async (req, res, next) => {
  //Check for error
  const errors = validationResult(req);
  //if error show the first one as they happend
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    return res.status(400).json({ errors: extractedErrors });
  }
  //Proceed to next middleware
  next();
};

exports.validateTemperature = (req, res, next) => {
  let temperature = parseFloat(req.body.temperature);
  if (temperature >= 36.5 && temperature <= 37.5) {
    next();
  } else {
    let errors = ['Mera vuelta con esa temperatura pai.'];
    return res.status(400).json({ errors });
  }
};

exports.validateDate = (req, res, next) => {
  let year = new Date(req.body.birthday).getFullYear();
  if (year >= 1800) {
    next();
  } else {
    let errors = ['El mísmisimo Tutankamón.'];
    return res.status(400).json({ errors });
  }
};
