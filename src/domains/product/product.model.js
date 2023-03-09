const Joi = require('joi');

class Product {
  constructor({
    id,
    title,
    description,
    price,
    image,
    fines_broken,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this.finesBroken = fines_broken;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static validate(req) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Nama produk harus terisi',
        'any.required': 'Nama produk harus terisi',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'Deskripsi produk harus terisi',
        'any.required': 'Deskripsi produk harus terisi',
      }),
      price: Joi.string().required().messages({
        'string.empty': 'Harga produk harus terisi',
        'any.required': 'Harga produk harus terisi',
      }),
      fines_broken: Joi.string().required().messages({
        'string.empty': 'Harga ganti rugi produk harus terisi',
        'any.required': 'Harga ganti rugi produk harus terisi',
      }),
    });

    const validate = schema.validate(req.body);
    if (validate.error != undefined) {
      throw new Error(validate.error.details[0].message);
    }
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      price: this.price,
      fines_broken: this.finesBroken,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Product };
