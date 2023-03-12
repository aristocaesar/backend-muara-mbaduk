class Product {
  constructor({
    id,
    title,
    slug,
    description,
    price,
    image,
    compensation,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.image = image;
    this.price = price;
    this.finesBroken = compensation;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      image: this.image,
      price: this.price,
      compensation: this.finesBroken,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Product };
