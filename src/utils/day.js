const Joi = require('joi').extend(require('@joi/date'));

class Day {
  constructor(date) {
    this.date = this.valid(date);
  }

  /**
   * Check format date
   * @param {string} date
   * @returns
   */
  valid(date) {
    const schema = Joi.date().format('DD/MM/YYYY').required().messages({
      'date.empty': 'Tanggal harus terisi',
      'any.required': 'Tanggal harus terisi',
    });
    const validate = schema.validate(date);
    if (validate.error != undefined) {
      throw validate.error.details[0].message;
    }
    return date;
  }

  /**
   * Convert input date to standart date
   * @returns
   */
  toStandart() {
    const date = this.date.split('/');
    return new Date([date[1], date[0], date[2]].join('/'));
  }

  /**
   * Convert time milesecond to second
   * @returns
   */
  toSecond() {
    return Math.floor(this.toStandart().getTime() / 1000);
  }

  /**
   * Get date now mm/dd/yyyy
   * @returns String
   */
  today() {
    return new Date().toLocaleDateString();
  }

  /**
   * Get milisecond date now
   * @returns Number
   */
  todaySecond() {
    const now = new Date().toLocaleDateString();
    return Math.floor(new Date(now).getTime() / 1000);
  }

  /**
   * Check day is less today
   * @returns
   */
  isExpired() {
    return this.toSecond() >= this.todaySecond() ? false : true;
  }

  /**
   * Check weekend
   * @param {String} date
   * @returns Boolean
   */
  isWeekend() {
    if (this.isExpired()) throw 'Tanggal telah kadaluarsa';
    const day = this.toStandart().getDay();
    return day == 0 || day == 6;
  }

  /**
   * Set expire time based on minute
   * @param {number} hours
   * @returns
   */
  expired(hours) {
    let now = this.todaySecond();
    return (now += hours * 3600);
  }
}

module.exports = { Day };
