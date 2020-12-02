const fs = require('fs');
const { DB_PATH } = require('../../../config/index');

class UsersController {
  async createUser(req, res) {
    try {
      let users = await readFile();
      let id = users.length + 1;
      let { name, birthday, temperature } = req.body;
      let email = req.body.email ? req.body.email : null;
      let clothesColor = req.body.clothesColor ? req.body.clothesColor : null;
      let newUser = { id, name, birthday, temperature, email, clothesColor };
      users.push(newUser);
      users = JSON.stringify(users);
      await writeFile(users);

      return res.status(201).json({
        message: `Bienvenido a la party ${newUser.name}`,
        user: newUser,
      });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }

  async getUsers(req, res) {
    try {
      let users = await readFile();
      if (areTherePartyers(users)) {
        return res.status(200).json(users);
      } else {
        return res.status(200).json({
          message:
            'Qué asquito de party parce :(, no hay nadie partyseando aún.',
        });
      }
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
}

const readFile = async () => {
  let data = fs.readFileSync(DB_PATH, 'utf8');

  return JSON.parse(data);
};

const writeFile = async (users) => {
  fs.writeFileSync(DB_PATH, users, 'utf8', function (err) {
    if (err) throw err;
  });
};

const areTherePartyers = (users) => {
  if (users.length > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = new UsersController();
