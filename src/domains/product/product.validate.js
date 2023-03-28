const Joi = require('joi');

class ProductValidate {
  static valid(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Nama produk harus terisi',
        'any.required': 'Nama produk harus terisi',
      }),
      slug: Joi.string().required().messages({
        'string.empty': 'Slug produk harus terisi',
        'any.required': 'Slug produk harus terisi',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'Deskripsi produk harus terisi',
        'any.required': 'Deskripsi produk harus terisi',
      }),
      image: Joi.string().required().messages({
        'string.empty': 'Gambar produk harus terisi',
        'any.required': 'Gambar produk harus terisi',
      }),
      price: Joi.number().required().messages({
        'string.empty': 'Harga produk harus terisi',
        'any.required': 'Harga produk harus terisi',
      }),
      compensation: Joi.number().required().messages({
        'string.empty': 'Harga ganti rugi produk harus terisi',
        'any.required': 'Harga ganti rugi produk harus terisi',
      }),
    });

    const validate = schema.validate(body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }
}

module.exports = { ProductValidate };
