class Review {
  constructor({
    id,
    pkg,
    id_payment,
    fullname,
    images,
    star,
    description,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.pkg = pkg;
    this.payment = id_payment;
    this.fullname = fullname;
    this.images = images;
    this.star = star;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      package: this.pkg,
      payment: this.payment,
      fullname: this.fullname,
      images: this.images,
      star: this.star,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Review };
