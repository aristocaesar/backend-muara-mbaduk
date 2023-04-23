class Uniq {
  static randomNumbers(loop) {
    let random = [];
    for (let i = 0; i < loop; i++) {
      random.push(Math.floor(Math.random() * loop));
    }
    return random.join('');
  }
}

module.exports = { Uniq };
