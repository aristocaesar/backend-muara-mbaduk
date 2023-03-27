const Joi = require('joi');

class UserValidate {
  static validChangeStatus(body) {
    const schema = Joi.object({
      access: Joi.string().valid('active', 'suspend').required().messages({
        'string.empty': 'Status akses harus terisi',
        'any.required': 'Status akses harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { UserValidate };
