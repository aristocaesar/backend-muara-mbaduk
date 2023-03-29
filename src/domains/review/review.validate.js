const Joi = require('joi');

class ReviewValidate {
  static valid(body) {
    const schema = Joi.object({
      id_package: Joi.string().required().messages({
        'string.empty': 'Slug paket harus terisi',
        'any.required': 'Slug paket harus terisi',
      }),
      id_user: Joi.string().required().messages({
        'string.empty': 'Id user harus terisi',
        'any.required': 'Id user harus terisi',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'Deskripsi testimoni harus terisi',
        'any.required': 'Deskripsi testimoni harus terisi',
      }),
      star: Joi.number().required().valid(1, 2, 3, 4, 5).messages({
        'number.empty': 'Ulasan bintang harus terisi',
        'any.required': 'Ulasan bintang harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { ReviewValidate };
