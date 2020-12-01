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

  async getAllByStatus(req, res) {
    // Call the service
    const response = await UsersService.getAllByStatus();

    if (response.success) {
      return res.status(200).send(response.users);
    } else {
      return res.status(200).json({ message: response.message });
    }
  }

  async getAll(req, res) {
    // Call the service
    const response = await UsersService.getAll();

    if (response.success) {
      return res.status(200).send(response.users);
    } else {
      return res.status(200).json({ message: response.message });
    }
  }

  async getAllWithAvocados(req, res) {
    // Call the service
    const response = await UsersService.getAllWithAvocados();

    if (response.success) {
      return res.status(200).send(response.users);
    } else {
      return res.status(200).json({ message: response.message });
    }
  }

  async getDjEvent(req, res) {
    // Call the service
    const response = await UsersService.getDjEvent();

    if (response.success) {
      return res.status(200).send(response.users);
    } else {
      return res.status(200).json({ message: response.message });
    }
  }

  async updateOne(req, res) {
    let { id } = req.params;
    const response = await UsersService.updatePartying(id);

    if (response.success) {
      return res.status(200).send(response.update);
    } else {
      return res.status(400).json({ message: response.message });
    }
  }
}

module.exports = new UsersController();
