const router = require('express').Router();
const { UsersController } = require('../../controllers/reto2/index');
const { UsersValidator } = require('../../middlewares/reto2/index');

router.route('/').get(UsersController.getAll);
router
  .route('/')
  .post(
    UsersValidator.validations,
    UsersValidator.userValidator,
    UsersValidator.validateTemperature,
    UsersController.createOne
  );

module.exports = router;
