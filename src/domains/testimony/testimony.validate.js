const Joi = require('joi');

class TestimonyValidate {
  static valid(body) {
    const schema = Joi.object({
      fullname: Joi.string().required().messages({
        'string.empty': 'Nama lengkap harus terisi',
        'any.required': 'Nama lengkap harus terisi',
      }),
      images: Joi.string().required().messages({
        'string.empty': 'Gambar testimoni harus terisi',
        'any.required': 'Gambar testimoni harus terisi',
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

module.exports = { TestimonyValidate };
