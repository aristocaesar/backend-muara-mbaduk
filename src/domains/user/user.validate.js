const Joi = require('joi');

class UserValidate {
  static register(payload) {
    const schema = Joi.object({
      fullname: Joi.string().required().messages({
        'string.empty': 'Nama lengkap harus terisi',
        'any.required': 'Nama lengkap harus terisi',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Email harus terisi',
        'any.required': 'Email harus terisi',
      }),
      images: Joi.string().required().messages({
        'string.empty': 'Gambar harus terisi',
        'any.required': 'Gambar harus terisi',
      }),
    });

    const validate = schema.validate(payload);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validChangeStatus(body) {
    const schema = Joi.object({
      access: Joi.string().valid('active', 'suspend').required().messages({
        'string.empty': 'Status akses harus terisi',
        'any.required': 'Status akses harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { UserValidate };
