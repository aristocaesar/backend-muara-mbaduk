const Joi = require('joi').extend(require('@joi/date'));

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

  static checkin(body) {
    const schema = Joi.object({
      date: Joi.date().format('DD/MM/YYYY').required().messages({
        'date.empty': 'Tanggal harus terisi',
        'any.required': 'Tanggal harus terisi',
      }),
      camping: Joi.boolean().required().messages({
        'string.empty': 'Pilihan camping harus terisi',
        'any.required': 'Pilihan camping harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { TicketValidate };
