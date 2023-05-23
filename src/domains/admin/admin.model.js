class Admin {
  constructor({
    id,
    fullname,
    email,
    password,
    role,
    access,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.access = access;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role,
      access: this.access,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Admin };
