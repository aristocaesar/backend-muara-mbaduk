const mitrans = require('midtrans-client');

class Mitrans {
  static core() {
    try {
      return new mitrans.CoreApi({
        isProduction: false,
        clientKey: 'SB-Mid-client-JxjXHAigcYdFms8Q',
        serverKey: 'SB-Mid-server-BZfGZSaXwr-7rDLS67suGWQO',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Mitrans };
