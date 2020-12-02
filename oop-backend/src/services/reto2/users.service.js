class UsersService {
  constructor({ UsersRepository }) {
    this.UsersRepository = UsersRepository;
  }
  async createOneUser(entity) {
    const { birthday } = entity;

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

// function validateTemperature(temperature){}

function areTherePartyers(users) {
  if (users.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = UsersService;
