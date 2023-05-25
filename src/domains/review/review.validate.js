const Joi = require('joi');

class ReviewValidate {
  static valid(body) {
    const schema = Joi.object({
      id_package: Joi.alternatives()
        .try(
          Joi.string().required().messages({
            'string.empty': 'Id paket harus terisi',
            'any.required': 'Id paket harus terisi',
          }),
          Joi.array().items(Joi.string()).required().min(1).messages({
            'array.base': 'Id paket harus terisi',
            'any.required': 'Id paket harus terisi',
            'array.includesRequiredUnknowns': 'Id paket harus terisi',
          })
        )
        .required(),
      id_payment: Joi.string()
        .required()
        .messages({
          'string.empty': 'Id payment harus terisi',
          'any.required': 'Id payment harus terisi',
        })
        .required(),
      id_user: Joi.string()
        .required()
        .messages({
          'string.empty': 'Id user harus terisi',
          'any.required': 'Id user harus terisi',
        })
        .required(),
      description: Joi.string()
        .required()
        .messages({
          'string.empty': 'Deskripsi testimoni harus terisi',
          'any.required': 'Deskripsi testimoni harus terisi',
        })
        .required(),
      star: Joi.number()
        .required()
        .valid(1, 2, 3, 4, 5)
        .messages({
          'number.empty': 'Ulasan bintang harus terisi',
          'any.required': 'Ulasan bintang harus terisi',
        })
        .required(),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static update(body) {
    const schema = Joi.object({
      description: Joi.string().min(5).max(1000).messages({
        'string.empty': 'Deskripsi testimoni harus terisi',
        'any.required': 'Deskripsi testimoni harus terisi',
      }),
      star: Joi.number().valid(1, 2, 3, 4, 5).messages({
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
