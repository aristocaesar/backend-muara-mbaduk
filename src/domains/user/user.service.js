const { OAuth2Client } = require('google-auth-library');
const { knex } = require('../../config/database');
const { User } = require('./user.model');
const { v4: uuid } = require('uuid');
const { UserValidate } = require('./user.validate');
const { Authentication } = require('../../middleware/authentication');

class UserService {
  /**
   * Service get all user
   * @returns Object
   */
  static async get() {
    return await knex('users')
      .select()
      .then((users) => users.map((user) => new User(user).toJson()))
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get user by id
   * @returns Object
   */
  static async getById(id) {
    return await knex('users')
      .select()
      .where('id', id)
      .first()
      .then((user) => {
        if (user != undefined) return new User(user).toJson();
        return [];
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service login user
   * @returns Object
   */
  static async login(token) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return await knex('users')
        .select()
        .where('email', payload.email)
        .first()
        .then(async (user) => {
          /**
           * When user not registered
           */
          if (user == undefined) {
            const _user = {
              id: uuid(),
              fullname: payload.name,
              email: payload.email,
              images: payload.picture,
            };
            await knex('users')
              .insert(_user)
              .catch((error) => {
                throw error;
              });
          } else {
            /**
             * When user registered but user access suspend
             */
            if (user.access == 'suspend') throw 'Akun anda ditangguhkan';
          }
          /**
           * Generate token JWT
           */
          const tokenAccess = Authentication.Sign({
            fullname: payload.name,
            email: payload.email,
            images: payload.picture,
          });
          return {
            token: tokenAccess,
          };
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Service verify user
   * @returns Object
   */
  static async account(payload) {
    try {
      if (payload.token == undefined || payload.token == null)
        throw 'Account access expired';
      const { token } = payload;
      return Authentication.Verify(token);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Service change access user
   * @returns Object
   */
  static async changeAccess(id, body) {
    UserValidate.validChangeStatus(body);
    return await knex('users')
      .update(body)
      .where('id', id)
      .then((updated) => {
        if (updated == 0) throw 'Id atau user yang masukkan tidak tersedia';
        return new User(body).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { UserService };
