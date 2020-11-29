const UsersService = require('./users.service');
const { UsersRepository } = require("../repositories");

const usersService = new UsersService({ UsersRepository });

module.exports = {
  UsersService: usersService,
};
