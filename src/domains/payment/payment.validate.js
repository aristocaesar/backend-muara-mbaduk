const Joi = require('joi');

class PaymentValidate {
  /**
   * Validate for payment cash
   * @param {Object} payload
   */
  static pay(payload) {
    const schema = Joi.object({
      user_id: Joi.string().required().messages({
        'string.empty': 'Id user harus terisi',
        'any.required': 'Id user harus terisi',
      }),
      date: Joi.string().required().messages({
        'string.empty': 'Tanggal kunjungan harus terisi',
        'any.required': 'Tanggal kunjungan harus terisi',
      }),
      camping: Joi.boolean().required().messages({
        'string.empty': 'Pilihan camping harus terisi',
        'any.required': 'Pilihan camping harus terisi',
      }),
      bank: Joi.string()
        .valid('bca', 'bri', 'bni')
        .allow(null)
        .required()
        .messages({
          'string.empty': 'Bank harus terisi',
          'any.required': 'Bank harus terisi',
        }),
      packages: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required().messages({
              'string.empty': 'Id paket harus terisi',
              'any.required': 'Id paket harus terisi',
            }),
            quantity: Joi.number().required().min(1).messages({
              'number.min': 'Jumlah paket harus terisi',
              'number.empty': 'Jumlah paket harus terisi',
              'any.required': 'Jumlah paket harus terisi',
            }),
          }).default({})
        )
        .required()
        .default([]),
      tickets: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required().messages({
              'string.empty': 'Id tiket harus terisi',
              'any.required': 'Id tiket harus terisi',
            }),
            name: Joi.string().allow(null).required().messages({
              'string.empty': 'Nama identitas harus terisi',
              'any.required': 'Nama identitas harus terisi',
            }),
            identity: Joi.string().allow(null).required().messages({
              'string.empty': 'Id identitas harus terisi',
              'any.required': 'Id identitas harus terisi',
            }),
          }).required()
        )
        .required(),
    });

    const validate = schema.validate(payload);

    if (validate.error != undefined) {
      throw validate.error.details[0].message;
    }
  }

  /**
   * Validate for update status transaction
   * @param {Object} payload
   */
  static changeStatus(payload) {
    const schema = Joi.object({
      id: Joi.string().required().messages({
        'string.empty': 'Id transaksi harus terisi',
        'any.required': 'Id transaksi harus terisi',
      }),
      status: Joi.string()
        .valid('pending', 'settlement', 'expire', 'deny', 'cancel')
        .required()
        .messages({
          'string.empty': 'Status transaksi harus terisi',
          'any.required': 'Status transaksi harus terisi',
        }),
    });

    const validate = schema.validate(payload);
    if (validate.error != undefined) {
      throw validate.error;
    }
  }
}

module.exports = { PaymentValidate };
