const Joi = require('joi');

class NewsValidate {
  static valid(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Judul berita harus terisi',
        'any.required': 'Judul berita harus terisi',
      }),
      slug: Joi.string().required().messages({
        'string.empty': 'Slug berita harus terisi',
        'any.required': 'Slug berita harus terisi',
      }),
      body: Joi.string().required().messages({
        'string.empty': 'Isi berita harus terisi',
        'any.required': 'Isi berita harus terisi',
      }),
      thumbnail: Joi.string().required().messages({
        'string.empty': 'Thumbnail berita harus terisi',
        'any.required': 'Thumbnail berita harus terisi',
      }),
      author: Joi.required().messages({
        'string.empty': 'Author berita harus terisi',
        'any.required': 'Author berita harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { NewsValidate };
