const Joi = require('joi');

class TicketValidate {
  static valid(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Nama tiket harus terisi',
        'any.required': 'Nama tiket harus terisi',
      }),
      category: Joi.string().valid('tourist', 'transport').required().messages({
        'string.empty': 'Kategori harus terisi',
        'any.required': 'Kategori harus terisi',
      }),
      normal_day: Joi.number().required().messages({
        'number.empty': 'Harga hari kerja/biasa harus terisi',
        'any.required': 'Harga hari kerja/biasa harus terisi',
      }),
      weekend_day: Joi.number().required().messages({
        'number.empty': 'Harga hari weekend harus terisi',
        'any.required': 'Harga hari weekend harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { TicketValidate };
