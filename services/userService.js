const bcrypt = require('bcrypt');
const salt = 10;
class UserService {
  static comparePassword(candidatedPw, hash) {
    return bcrypt.compare(candidatedPw, hash);
  }

  static hashPassword(password) {
    return bcrypt.hash(password, salt);
  }

  static generateToken({ _id }) {
    const { SECRET_KEY } = process.env;
  }
}

module.exports = UserService;
