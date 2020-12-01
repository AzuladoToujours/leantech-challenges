class UsersService {
  constructor({ UsersRepository }) {
    this.UsersRepository = UsersRepository;
  }
  async createOneUser(entity) {
    const { birthday } = entity;

    checkClothingColor(entity);

    // Calculate age
    const age = getAge(birthday);
    // Ask for new condition
    if (age < 18) {
      let errors = ['No es una guadería pai.'];
      return {
        success: false,
        errors,
      };
    }
    // Add age to user
    entity.age = age;
    // Create user
    const user = await this.UsersRepository.createOne(entity);
    return {
      success: true,
      data: user,
    };
  }

  async getAllByStatus() {
    var queryCondition = { isPartying: true };

    const users = await this.UsersRepository.getAll(queryCondition);

    if (areTherePartyers(users)) {
      return {
        success: true,
        users,
      };
    } else {
      let message =
        'Qué asquito de party parce :(, no hay nadie partyseando aún.';
      return {
        success: false,
        message,
      };
    }
  }

  async getAll() {
    var queryCondition = {};

    const users = await this.UsersRepository.getAll(queryCondition);

    if (areTherePartyers(users)) {
      return {
        success: true,
        users,
      };
    } else {
      let message =
        'Pero de verdad, asquito, ni siquiera afuera :(, no hay nadie partyseando aún.';
      return {
        success: false,
        message,
      };
    }
  }

  async getAllWithAvocados() {
    var queryCondition = {};

    const users = await this.UsersRepository.getAll(queryCondition);

    if (areTherePartyers(users)) {
      users.map((user) => {
        user.mask = true;
      });
      return {
        success: true,
        users,
      };
    } else {
      let message =
        'Aquí lo único que hay para ver es una fiesta lamentable señor agente.';
      return {
        success: false,
        message,
      };
    }
  }

  async getDjEvent() {
    let queryDjEvent = getQueryForDjEvent();

    const users = await this.UsersRepository.getDjEvent(queryDjEvent);

    const response = enoughUsersForDjEvent(users);

    if (response.success) {
      return {
        success: true,
        users,
      };
    } else {
      return {
        success: false,
        message: response.errors,
      };
    }
  }

  async updatePartying(id) {
    const update = await this.UsersRepository.updateOne(id);

    if (update) {
      return {
        success: true,
        update,
      };
    } else {
      let message = '¿Ese id si existe pai?';
      return {
        success: false,
        message: message,
      };
    }
  }
}

// Helper functions

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function checkClothingColor(entity) {
  if (entity.clothingColor) {
    if (entity.role === 'dj') {
      entity.clothingColor = 'white';
    } else if (entity.role === 'bartender') {
      entity.clothingColor = 'red';
    }
  } else {
    entity.clothingColor = 'white';
  }
}

function areTherePartyers(users) {
  if (users.length > 0) {
    return true;
  } else {
    return false;
  }
}

function enoughUsersForDjEvent(users) {
  let djs = 0;
  let partycipants = 0;
  let bartenders = 0;
  let success = true;
  let errors = [];
  users.map((user) => {
    if (user.isPartying) {
      if (user.role == 'dj') {
        djs++;
      } else if (user.role == 'partycipant') {
        partycipants++;
      } else {
        bartenders++;
      }
    }
  });

  let enoughDjs = checkEnoughDjs(djs, errors);
  let enoughPartycipants = checkEnoughPartycipants(partycipants, errors);
  let enoughBartenders = checkEnoughBartenders(bartenders, errors);

  if (enoughDjs && enoughPartycipants && enoughBartenders) {
    success = true;
  } else {
    success = false;
  }

  return {
    success,
    errors,
  };
}

function checkEnoughDjs(djs, errors) {
  if (djs < 2) {
    let debt = 2 - djs;
    let message = `¿Una party sin música? Nos faltan ${debt} djs`;
    errors.push(message);
    return false;
  }
  return true;
}

function checkEnoughPartycipants(partycipants, errors) {
  if (partycipants < 5) {
    let debt = 5 - partycipants;
    let message = `¿Pa qué una party sí no hay gente? Nos faltan ${debt} partycipants`;
    errors.push(message);
    return false;
  }
  return true;
}

function checkEnoughBartenders(bartenders, errors) {
  if (bartenders < 1) {
    let message = '¿Nos vamos a quedar secos? Nos falta 1 bartender';
    errors.push(message);
    return false;
  }
  return true;
}

function getQueryForDjEvent() {
  return [
    {
      $project: {
        name: 1,
        birthday: 1,
        age: 1,
        temperature: 1,
        clothingColor: 1,
        isPartying: 1,
        role: 1,
        rankRole: {
          $switch: {
            branches: [
              { case: { $eq: ['$role', 'dj'] }, then: 0 },
              { case: { $eq: ['$role', 'partycipant'] }, then: 1 },
              { case: { $eq: ['$role', 'bartender'] }, then: 2 },
            ],
            default: 10,
          },
        },
        rankColor: {
          $switch: {
            branches: [
              { case: { $eq: ['$clothingColor', 'red'] }, then: 0 },
              { case: { $eq: ['$clothingColor', 'green'] }, then: 1 },
              { case: { $eq: ['$clothingColor', 'blue'] }, then: 2 },
              { case: { $eq: ['$clothingColor', 'black'] }, then: 3 },
              { case: { $eq: ['$clothingColor', 'white'] }, then: 4 },
            ],
            default: 10,
          },
        },
      },
    },
    { $sort: { rankColor: 1 } },
    { $sort: { rankRole: 1 } },
  ];
}

module.exports = UsersService;
