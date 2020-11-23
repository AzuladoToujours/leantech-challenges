const router = require('express').Router();
const { UsersController } = require('../controllers/index');
const { UsersValidator } = require('../middlewares/index');

router.get('/users', UsersController.getUsers);
router.post(
  '/users',
  UsersValidator.validations,
  UsersValidator.userValidator,
  UsersValidator.validateTemperature,
  UsersController.createUser
);

module.exports = router;
