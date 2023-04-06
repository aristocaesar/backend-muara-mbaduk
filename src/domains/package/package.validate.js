const Joi = require('joi');

class PackageValidate {
  static valid(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Nama paket harus terisi',
        'any.required': 'Nama paket harus terisi',
      }),
      slug: Joi.string().required().messages({
        'string.empty': 'Slug paket harus terisi',
        'any.required': 'Slug paket harus terisi',
      }),
      summary: Joi.string().required().messages({
        'string.empty': 'Deskripsi paket harus terisi',
        'any.required': 'Deskripsi paket harus terisi',
      }),
      category: Joi.string().valid('general', 'custom').required().messages({
        'string.empty': 'Kategori paket harus terisi',
        'any.required': 'Kategori paket harus terisi',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'Deskripsi paket harus terisi',
        'any.required': 'Deskripsi paket harus terisi',
      }),
      image: Joi.string().required().messages({
        'string.empty': 'Gambar paket harus terisi',
        'any.required': 'Gambar paket harus terisi',
      }),
      price: Joi.number().required().messages({
        'string.empty': 'Harga paket harus terisi',
        'any.required': 'Harga paket harus terisi',
      }),
    });

    const validate = schema.validate(body);

    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validProduct(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Nama produk harus terisi',
        'any.required': 'Nama produk harus terisi',
      }),
      quantity: Joi.number().required().messages({
        'number.empty': 'Quantity produk harus terisi',
        'any.required': 'Quantity produk harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  static validProductUpdateQuantity(body) {
    const schema = Joi.object({
      quantity: Joi.number().required().messages({
        'number.empty': 'Quantity produk harus terisi',
        'any.required': 'Quantity produk harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { PackageValidate };
