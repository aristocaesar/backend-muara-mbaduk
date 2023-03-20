class News {
  constructor({
    id,
    title,
    slug,
    body,
    thumbnail,
    author,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.body = body;
    this.thumbnail = thumbnail;
    this.author = author;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      body: this.body,
      thumbnail: this.thumbnail,
      author: this.author,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { News };
