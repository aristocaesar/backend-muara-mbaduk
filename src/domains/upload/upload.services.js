const { knex } = require('../../config/database');
const { Upload } = require('./upload.model');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

class UploadService {
  /**
   *
   * @param {String} file
   * @returns
   */
  static filename(file) {
    const name = file.split('.');
    const format = name.length - 1;
    const result = name
      .map((fl, idx) => {
        if (idx != format) return fl;
      })
      .join('');
    return `${result.slice(0, 25).replace(/ /g, '')}.${name[format]}`;
  }

  /**
   * Get all file uploaded
   * @returns
   */
  static async get({ search: keyword }) {
    if (keyword != undefined) {
      return await this.search(keyword);
    }

    return await knex
      .select()
      .table('uploads')
      .then((rows) => {
        return rows.map((row) => new Upload(row).toJson());
      });
  }

  /**
   * Get file uploaded by id
   * @returns
   */
  static async getByName(name) {
    return await knex('uploads')
      .where('filename', name)
      .first()
      .then((row) => {
        if (row == undefined) return [];
        return new Upload(row).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Search file uploaded by name or filename
   * @param {String} keyword
   * @returns
   */
  static async search(keyword) {
    return await knex('uploads')
      .where('filename', 'like', `%${keyword}%`)
      .then((rows) => {
        if (rows.length == 0) return [];
        return rows.map((row) => new Upload(row).toJson());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Store file upload to database and server
   * @param {Request} req
   * @returns
   */
  static async store(req) {
    if (req.files == undefined) throw new Error('Harap memasukkan file');
    const files = req.files.map((file) => {
      return {
        id: uuidv4(),
        filename: file.filename,
        mime_type: file.mimetype,
        file_size: file.size,
        url: process.env.APP_URI.concat(`/static/uploads/${file.filename}`),
      };
    });
    return await knex('uploads')
      .insert(files)
      .then(() => {
        return files;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Delete file at database and sever
   * @param {Request} req
   * @returns
   */
  static async delete(filename) {
    return await knex('uploads')
      .where({ filename })
      .del()
      .then(async () => {
        const filePath = `${appRoot.path}/src/public/uploads/${filename}`;
        await fs.unlink(filePath).catch(() => {
          throw 'Tidak ada berkas atau direktori yang ditemukan';
        });
        return 'Berkas berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { UploadService };
