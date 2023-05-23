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
      .where('role', 'default')
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
    return await knex('administrator')
      .where('id', id)
      .first()
      .then((admin) => {
        // Check avaible admin
        if (admin == undefined) return [];

        // Check valid password
        if (body.old_password != undefined && body.new_password != undefined) {
          if (!bcrypt.compareSync(body.old_password, admin.password))
            throw 'Password lama salah!';
        }

        // Merge payload for update
        const payload = {
          fullname: body.fullname == undefined ? admin.fullname : body.fullname,
          email: body.email == undefined ? admin.email : body.email,
          password:
            body.new_password == undefined
              ? admin.password
              : bcrypt.hashSync(body.new_password, 8),
          role: body.role == undefined ? admin.role : body.role,
          access: body.access == undefined ? admin.access : body.access,
        };

        // Update administrator
        return knex('administrator')
          .where('id', id)
          .update(payload)
          .then((row) => {
            if (row == 0)
              throw new Error('Admin yang anda masukkan tidak terdaftar');
            return new Admin(payload).toJson();
          });
      })
      .catch((error) => {
        if (error.errno == 1062)
          throw new Error('Email yang anda masukkan sudah terdaftar!');
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
      .then((admin) => {
        if (admin == undefined) throw 'Email atau password salah!';

        if (!bcrypt.compareSync(password, admin.password))
          throw 'Email atau password salah!';

        return new Admin(admin).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { AdminService };
