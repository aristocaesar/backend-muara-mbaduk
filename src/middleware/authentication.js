const jwt = require('jsonwebtoken');

class Authentication {
  /**
   * Sign JWT
   * @param {Object} payload
   * @returns
   */
  static Sign(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  /**
   * Verify token JWT
   * @param {String} token
   */
  static Verify(token) {
    return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) throw 'Account access expired';
      return decoded;
    });
  }
}

module.exports = { Authentication };
