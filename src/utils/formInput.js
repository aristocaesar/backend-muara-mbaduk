class FormInput {
  static slug(value) {
    return value.toString().toLowerCase().replace(/ /g, '-');
  }
}

module.exports = { FormInput };
