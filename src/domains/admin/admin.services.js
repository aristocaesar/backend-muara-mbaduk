const { knex } = require('../../config/database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const { Admin } = require('./admin.model');
const { AdminValidate } = require('./admin.validate');

class AdminService {
  /**
   * Service get administartor
   */
  static async get() {
    return await knex('administrator')
      .select()
      .then((admins) => {
        return admins.map((admin) => new Admin(admin).toJson());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get administartor by id
   * @param {String} id
   */
  static async getById(id) {
    return await knex('administrator')
      .select()
      .where('id', id)
      .first()
      .then((admin) => {
        return admin == undefined ? [] : new Admin(admin).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store administartor
   * @param {Object} body
   */
  static async store(body) {
    AdminValidate.valid(body);
    const admin = Object.assign({ id: uuid() }, body);
    admin.password = bcrypt.hashSync(admin.password, 8);
    return await knex('administrator')
      .insert(admin)
      .then(() => new Admin(admin).toJson())
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error(`Admin dengan email ${admin.email} sudah terdaftar`);
        throw new Error(error);
      });
  }

  /**
   * Service update administartor by id
   * @param {String} id
   * @param {Object} body
   */
  static async update(id, body) {
    AdminValidate.validUpdate(body);
    return knex('administrator')
      .where('id', id)
      .update(body)
      .then((row) => {
        if (row == 0)
          throw new Error('Admin yang anda masukkan tidak terdaftar');
        return new Admin(body).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service delete administartor by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(id) {
    return await knex('administrator')
      .where('id', id)
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau admin tersebut tidak tersedia';
        return 'Admin berhasil dihapus';
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service update email administartor
   * @param {Object} body
   */
  static async updateEmail(id, body) {
    AdminValidate.validUpdateEmail(body);
    return await knex('administrator')
      .where('id', id)
      .update(body)
      .then((updated) => {
        if (updated == 0) throw 'Id admin yang anda masukkan tidak terdaftar';
        return new Admin(body).toJson();
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error('Email yang anda masukkan sudah terdaftar');
        throw new Error(error);
      });
  }

  /**
   * Service update password administartor
   * @param {Object} body
   */
  static async updatePassword(id, body) {
    AdminValidate.validUpdatePassword(body);
    const password = bcrypt.hashSync(body.password, 8, (err, hash) => hash);
    return await knex('administrator')
      .where('id', id)
      .update({ password })
      .then((updated) => {
        if (updated == 0) throw 'Id admin yang anda masukkan tidak terdaftar';
        return 'Password berhasil diperbarui';
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service login administartor
   * @param {Object} body
   */
  static async signIn(body) {
    AdminValidate.validSignIn(body);

    const { email, password } = body;
    return knex('administrator')
      .select()
      .where('email', email)
      .first()
      .then((row) => {
        if (row == undefined) return 'Email atau password salah';
        return row;
      })
      .then((admin) => {
        if (!bcrypt.compareSync(password, admin.password))
          return 'Email atau password salah';
        return admin;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { AdminService };
