class Faq {
  constructor({ id, title, description, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Faq };
