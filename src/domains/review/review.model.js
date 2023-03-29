class Review {
  constructor({
    id,
    pkg,
    fullname,
    images,
    star,
    description,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.pkg = pkg;
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
