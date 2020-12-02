const router = require('express').Router();
const { UsersController } = require('../../controllers/reto1/index');
const { UsersValidator } = require('../../middlewares/reto1/index');

router.get('/', UsersController.getUsers);
router.post(
  '/',
  UsersValidator.validations,
  UsersValidator.userValidator,
  UsersValidator.validateTemperature,
  UsersController.createUser
);

module.exports = router;
