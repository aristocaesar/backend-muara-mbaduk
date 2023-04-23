const midtrans = require('midtrans-client');

class Midtrans {
  /**
   * Core Midtrans Configuration
   * @returns
   */
  core() {
    return new midtrans.CoreApi({
      isProduction: process.env.MIDTRANS_PRODUCTION == 'true' ? true : false,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
  }

  /**
   * Midtrans charge
   * @param {Object}
   * @returns
   */
  createTransaction({ order_id, gross_amount, bank, fullname, email }) {
    const params = {
      payment_type: 'bank_transfer',
      transaction_details: {
        gross_amount: gross_amount,
        order_id: order_id,
      },
      bank_transfer: {
        bank: bank,
      },
      customer_details: {
        first_name: fullname,
        email: email,
      },
      custom_expiry: {
        expiry_duration: 720, // 12 Hours
        unit: 'minute',
      },
    };

    try {
      return this.core().charge(params);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Midtrans };
