class User {
  constructor({ id, fullname, email, images, access, created_at, updated_at }) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.images = images;
    this.access = access;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  toJson() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      images: this.images,
      access: this.access,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { User };
