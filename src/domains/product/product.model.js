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
