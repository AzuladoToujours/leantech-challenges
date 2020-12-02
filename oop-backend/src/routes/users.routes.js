const router = require('express').Router();
const { UsersController } = require('../controllers');
const { UsersValidator } = require('../middlewares/index');

router.route('/').get(UsersController.getAllByStatus);
router.route('/all').get(UsersController.getAll);
router.route('/dj-event').get(UsersController.getDjEvent);
router.route('/police').get(UsersController.getAllWithAvocados);
router.route('/:id').patch(UsersController.updateOne);

router
  .route('/')
  .post(
    UsersValidator.validations,
    UsersValidator.userValidator,
    UsersValidator.validateTemperature,
    UsersValidator.validateDate,
    UsersController.createOne
  );

module.exports = router;
