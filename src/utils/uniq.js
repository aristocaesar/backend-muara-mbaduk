class Uniq {
  static randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

module.exports = { Uniq };
