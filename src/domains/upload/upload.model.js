class Upload {
  constructor({
    id,
    filename,
    mime_type,
    file_size,
    url,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.filename = filename;
    this.mime_type = mime_type;
    this.file_size = file_size;
    this.url = url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.id,
      filename: this.filename,
      mime_type: this.mime_type,
      file_size: this.file_size,
      url: this.url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = { Upload };
