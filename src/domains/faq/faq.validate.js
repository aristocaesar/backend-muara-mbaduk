const Joi = require('joi');

class FaqValidate {
  static valid(payload) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Title faq harus terisi',
        'any.required': 'Title faq harus terisi',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'Deskripsi faq harus terisi',
        'any.required': 'Deskripsi faq harus terisi',
      }),
    });

    const validate = schema.validate(payload);
    if (validate.error != undefined) {
      throw validate.error.details[0].message;
    }
  }
}

module.exports = { FaqValidate };
