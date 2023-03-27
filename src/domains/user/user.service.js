const { OAuth2Client } = require('google-auth-library');
const { knex } = require('../../config/database');
const { User } = require('./user.model');
const { v4: uuid } = require('uuid');
const { UserValidate } = require('./user.validate');
const { Authentication } = require('../../middleware/authentication');

class UserService {
  static async get() {
    return await knex('users')
      .select()
      .then((users) => users.map((user) => new User(user).toJson()))
      .catch((error) => {
        throw new Error(error);
      });
  }

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
            return await knex('users')
              .insert(_user)
              .then(() => {
                return new User(_user).toJson();
              })
              .catch((error) => {
                throw error;
              });
          }
          /**
           * When user registered but user access suspend
           */
          if (user.access == 'suspend') throw 'Akun anda ditangguhkan';
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
            user: new User(user).toJson(),
          };
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async account(payload) {
    try {
      if (payload == undefined) throw 'Account access expired';
      const { MUARA_MBADUK } = payload;
      return Authentication.Verify(MUARA_MBADUK);
    } catch (error) {
      throw new Error(error);
    }
  }

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
