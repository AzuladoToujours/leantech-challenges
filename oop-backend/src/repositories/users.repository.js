const { User } = require('../models');

// This repositories are for make querys to User, use them in the service.

class UsersRepository {
  async createOne(entity) {
    try {
      const doc = await User.create(entity);
      return doc;
    } catch (e) {
      console.log(e);
      let messsage = 'error';
      return messsage;
    }
  }

  async getAll(query) {
    try {
      const docs = await User.find(query).lean().exec();

      return docs;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

module.exports = new UsersRepository();
