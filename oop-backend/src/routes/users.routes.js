const router = require('express').Router();
const { UsersController } = require('../controllers');
const { UsersValidator } = require('../middlewares/index');

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
