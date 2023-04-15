const _ = require('lodash');

class MapArray {
  static group(arr, iteratee) {
    return _.groupBy(arr, iteratee);
  }

  static keyLength(arr) {
    return Object.keys(arr).map((key) => {
      return {
        id: key,
        length: Object.keys(arr[key]).length,
      };
    });
  }
}

module.exports = { MapArray };
