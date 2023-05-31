const Joi = require('joi');

class AdminValidate {
  static valid(body) {
    const schema = Joi.object({
      fullname: Joi.string().required().min(6).max(64).messages({
        'string.empty': 'Nama lengkap harus terisi',
        'any.required': 'Nama lengkap harus terisi',
      }),
      email: Joi.string().required().min(6).max(64).messages({
        'string.empty': 'Email harus terisi',
        'any.required': 'Email harus terisi',
      }),
      password: Joi.string().min(4).max(64).required().messages({
        'string.min': 'Password minimal berisi 4 karakter',
        'string.empty': 'Password harus terisi',
        'any.required': 'Password harus terisi',
      }),
      access: Joi.string().valid('active', 'suspend').required().messages({
        'string.empty': 'Akses harus terisi',
        'any.required': 'Akses harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validUpdate(body) {
    const schema = Joi.object({
      fullname: Joi.string().min(6).max(64).messages({
        'string.empty': 'Nama lengkap harus terisi',
        'any.required': 'Nama lengkap harus terisi',
      }),
      email: Joi.string().min(6).max(64).messages({
        'string.empty': 'Email harus terisi',
        'any.required': 'Email harus terisi',
      }),
      password: Joi.string().min(4).max(64).messages({
        'string.min': 'Password minimal berisi 4 karakter',
        'string.empty': 'Password harus terisi',
        'any.required': 'Password harus terisi',
      }),
      access: Joi.string().valid('active', 'suspend').messages({
        'string.empty': 'Akses harus terisi',
        'any.required': 'Akses harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validUpdateEmail(body) {
    const schema = Joi.object({
      email: Joi.string().required().max(64).messages({
        'string.empty': 'Email harus terisi',
        'any.required': 'Email harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validUpdatePassword(body) {
    const schema = Joi.object({
      password: Joi.string().min(4).required().messages({
        'string.min': 'Password minimal berisi 4 karakter',
        'string.empty': 'Password harus terisi',
        'any.required': 'Password harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validSignIn(body) {
    const schema = Joi.object({
      email: Joi.string().required().max(64).messages({
        'string.empty': 'Email harus terisi',
        'any.required': 'Email harus terisi',
      }),
      password: Joi.string().min(4).required().messages({
        'string.min': 'Password minimal berisi 4 karakter',
        'string.empty': 'Password harus terisi',
        'any.required': 'Password harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { AdminValidate };
