class Pages {
  constructor({ id, pages, slug, body, created_at, updated_at }) {
    this.id = id;
    this.pages = pages;
    this.slug = slug;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      pages: this.pages,
      slug: this.slug,
      body: this.body,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Pages };
