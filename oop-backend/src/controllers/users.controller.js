const { UsersService } = require('../services');

class UsersController {
  async createOne(req, res) {
    // Take user data from req.body
    var user = req.body;

    const response = await UsersService.createOneUser(user);

    if (response.success) {
      return res.status(201).send(response.data);
    } else {
      return res.status(400).json({ errors: response.errors });
    }
  }

  async getAll(req, res) {
    // Call the service
    const response = await UsersService.getAllByStatus();

    if (response.success) {
      return res.status(200).send(response.users);
    } else {
      return res.status(200).json({ message: response.message });
    }
  }
}

module.exports = new UsersController();
