const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

// Get Mongo URI from config
const { MONGO_URI } = require('../../config')

// Load model User
const { User } = require('../models');

// Connect to DB
mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/partycipants.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
