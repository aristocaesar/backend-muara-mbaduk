const Joi = require('joi');

class PaymentValidate {
  /**
   * Validate for payment cod
   * @param {Object} payload
   */
  static cash(payload) {
    const schema = Joi.object({
      user_id: Joi.string().required().messages({
        'string.empty': 'Id user harus terisi',
        'any.required': 'Id user harus terisi',
      }),
      type: Joi.string().valid('cash', 'bank').required().messages({
        'string.empty': 'Tipe pembayaran harus terisi',
        'any.required': 'Tipe pembayaran harus terisi',
      }),
      visit: Joi.string().required().messages({
        'string.empty': 'Tanggal kunjungan harus terisi',
        'any.required': 'Tanggal kunjungan harus terisi',
      }),
      day: Joi.string().valid('weekend', 'normal').required().messages({
        'string.empty': 'Jenis hari harus terisi',
        'any.required': 'Jenis hari harus terisi',
      }),
      tickets: Joi.array().items(
        Joi.object({
          id: Joi.string().required().messages({
            'string.empty': 'Id tiket harus terisi',
            'any.required': 'Id tiket harus terisi',
          }),
        })
      ),
    });

    const validate = schema.validate(payload);

    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  /**
   * Validate for payment bank
   * @param {Object} payload
   */
  static bank(payload) {}
}

module.exports = { PaymentValidate };
