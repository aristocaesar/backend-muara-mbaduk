const { knex } = require('../../config/database');
const { Upload } = require('./upload.model');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const appRoot = require('app-root-path');

class UploadService {
  /**
   * Get all file uploaded
   * @returns
   */
  static async get() {
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
  static async getById(id) {
    return await knex('uploads')
      .where('id', id)
      .first()
      .then((row) => {
        if (row != undefined) return new Upload(row).toJson();
        return [];
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
