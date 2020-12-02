const UsersService = require('./users.service');
const { UsersRepository } = require('../../repositories/reto2/index');

const usersService = new UsersService({ UsersRepository });

module.exports = {
  UsersService: usersService,
};
