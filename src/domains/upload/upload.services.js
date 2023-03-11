const { knex } = require('../../config/database');
const { Upload } = require('./upload.model');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const appRoot = require('app-root-path');
const Joi = require('joi');

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
  static async delete(req) {
    const schema = Joi.object({
      filename: Joi.string().required().messages({
        'string.empty': 'Filename file harus terisi',
        'any.required': 'Filename file harus terisi',
      }),
    });

    const validate = schema.validate(req.body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }

    return await knex('uploads')
      .where({ filename: req.body.filename })
      .del()
      .then(async () => {
        const filePath = `${appRoot.path}/src/public/uploads/${req.body.filename}`;
        return await fs.unlink(filePath).catch(() => {
          throw new Error('No such file or directory');
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { UploadService };
