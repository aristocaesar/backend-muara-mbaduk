const Joi = require('joi');

class PagesValidate {
  static valid(payload) {
    const schema = Joi.object({
      pages: Joi.string().required().messages({
        'string.empty': 'Nama halaman harus terisi',
        'any.required': 'Nama halaman harus terisi',
      }),
      slug: Joi.string().required().messages({
        'string.empty': 'Slug halaman harus terisi',
        'any.required': 'Slug halaman harus terisi',
      }),
      body: Joi.string().required().messages({
        'string.empty': 'Isi halaman harus terisi',
        'any.required': 'Isi halaman harus terisi',
      }),
    });

    const validate = schema.validate(payload);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { PagesValidate };
