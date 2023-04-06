class Day {
  /**
   * Date to string format dd/m/yyyy
   * @param {String} date
   * @returns String
   */
  static dateToString(date) {
    const dates = date.split('/');
    return new Date(
      [dates[1], dates[0], dates[2]].join('/')
    ).toLocaleDateString('id', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  /**
   * Get date now mm/dd/yyyy
   * @returns String
   */
  static today() {
    return new Date().toLocaleDateString();
  }

  /**
   * Get milisecond date now
   * @returns Number
   */
  static todayMilisecond() {
    return new Date(this.today()).getTime();
  }

  /**
   * Check weekend day with format dd/mm/yyyy
   * @param {String} date
   * @returns Boolean
   */
  static checkWeekend(date) {
    const dates = date.split('/');
    const dateSelected = new Date([dates[1], dates[0], dates[2]].join('/'));
    // Check valid date
    if (dateSelected instanceof Date && isNaN(dateSelected))
      throw 'Tanggal tidak valid';
    // Check date selected less then date now
    if (dateSelected.getTime() < this.todayMilisecond()) {
      throw 'Tanggal kadaluarsa';
    }
    const day = dateSelected.getDay();
    return day == 0 || day == 6;
  }
}

module.exports = { Day };
