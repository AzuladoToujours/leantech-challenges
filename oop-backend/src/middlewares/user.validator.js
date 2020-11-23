const { check, validationResult } = require('express-validator');

exports.validations = [
  //NAMES ARE NOT NULL
  check('name', '¿Cómo le decimos pues?').matches(/[a-zA-Z]{1,40}/),
  //BIRTHDAY MUST BE IN THE FORMAT
  check('birthday', '¿Nació ayer o qué papá?').isDate(),
  //TEMPERATURE MUST BE IN THE FORMAT
  check(
    'temperature',
    'Sin temperatura no me entra viejo; el formato es el siguiente: 36.5, 37.0, 37.8'
  ).matches(/^([0-9]{2})+\.([0-9]{1})$/),
  //CHECK FOR EMAIL
  check('email', 'Si va colocar email, coloquelo bien.').optional().isEmail(),
  //CHECK CLOTHES
  check('clothesColor', 'Dizque el hombre invisible, jmm.')
    .optional()
    .matches(/[a-zA-Z]{1,40}/),
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
