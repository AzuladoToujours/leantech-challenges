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

  async getDjEvent(query) {
    try {
      const docs = await User.aggregate(query);

      return docs;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async updateOne(id) {
    try {
      let user = await User.findOne({ _id: id });
      if (!user) {
        return false;
      }
      let reversePartying = !user.isPartying;
      let updatedDoc = await User.findOneAndUpdate(
        { _id: id },
        { isPartying: reversePartying },
        { new: true }
      )
        .lean()
        .exec();

      return updatedDoc;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

module.exports = new UsersRepository();
