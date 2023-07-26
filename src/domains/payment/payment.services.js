const _ = require('lodash');
const { Midtrans } = require('../../config/midtrans');
const { v4: uuid } = require('uuid');
const { PaymentValidate } = require('./payment.validate');
const { UserService } = require('../user/user.service');
const { knex } = require('../../config/database');
const { TicketService } = require('../ticket/ticket.services');
const { Barcode } = require('../../utils/barcode');
const { Day } = require('../../utils/day');
const { PackageService } = require('../package/package.services');
const { Uniq } = require('../../utils/uniq');

class PaymentService {
  /**
   * Get all transactions
   * @returns
   */
  static async get() {
    return await knex('payments')
      .select()
      .orderBy('created_at', 'desc')
      .then((payments) =>
        payments.map((payment) => {
          payment.camping = payment.camping == 1 ? true : false;
          return payment;
        })
      )
      .catch((error) => {
        throw Error(error);
      });
  }

  /**
   * Get transaction by id
   * @param {String} id
   * @returns
   */
  static async getById(id) {
    return await knex('payments')
      .select(
        'payments.*',
        'payment_detail.name_bank as bank',
        'payment_detail.va_bank as va_number',
        'payment_tickets.id as id_ticket',
        'payment_tickets.payment_id',
        'payment_tickets.name',
        'payment_tickets.identity',
        'payment_tickets.created_at',
        'payment_tickets.updated_at',
        'tickets.id as ticket_id',
        'tickets.title',
        'tickets.normal_day',
        'tickets.weekend_day'
      )
      .leftJoin('payment_detail', 'payments.id', 'payment_detail.payment_id')
      .leftJoin('payment_tickets', 'payments.id', 'payment_tickets.payment_id')
      .leftJoin('tickets', 'tickets.id', 'payment_tickets.ticket_id')
      .where({ 'payments.id': id })
      .orWhere({ 'payments.order_id': id })
      .then(async (payment) => {
        if (payment == undefined || payment.length == 0) return [];
        const transaction = _(payment)
          .groupBy('id')
          .map((groupRows) => ({
            id: groupRows[0].id,
            order_id: groupRows[0].order_id,
            user: groupRows[0].user_id,
            barcode: groupRows[0].barcode,
            camping: groupRows[0].camping == 1 ? true : false,
            type: groupRows[0].type,
            date: groupRows[0].date,
            date_types: groupRows[0].date_types,
            gross_amount: groupRows[0].gross_amount,
            status: groupRows[0].status,
            va_numbers: {
              bank: groupRows[0].bank,
              va_number: groupRows[0].va_number,
            },
            packages: null,
            tickets: null,
            expire_at: groupRows[0].expire_at,
            created_at: groupRows[0].created_at,
            updated_at: groupRows[0].updated_at,
          }))
          .first();

        await knex('users')
          .select()
          .where({ id: transaction.user })
          .first()
          .then((user) => {
            transaction.user = user;
          });

        await knex('payment_packages')
          .select(
            'payment_packages.package_id as id',
            'packages.title',
            'packages.price',
            'payment_packages.quantity',
            'packages.image'
          )
          .leftJoin('packages', 'payment_packages.package_id', 'packages.id')
          .where('payment_id', transaction.id)
          .then((packages) => {
            if (packages == undefined) transaction.packages = [];
            transaction.packages = packages;
          });

        await knex('payment_tickets')
          .select(
            'payment_tickets.ticket_id as id',
            'tickets.title',
            'tickets.category',
            `${
              transaction.date_types == 'normal'
                ? 'tickets.normal_day'
                : 'tickets.weekend_day'
            } as price`,
            'payment_tickets.name',
            'payment_tickets.identity'
          )
          .leftJoin('tickets', 'payment_tickets.ticket_id', 'tickets.id')
          .where('payment_id', transaction.id)
          .orderBy('tickets.category', 'asc')
          .then((tickets) => {
            if (tickets == undefined) transaction.tickets = [];
            transaction.tickets = tickets;
          });

        return transaction;
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  /**
   * Get all transactions where id user
   * @param {String} id
   * @returns
   */
  static async getByUser(id) {
    return await knex('payments')
      .select()
      .where({ user_id: id })
      .orderBy('created_at', 'desc')
      .then((payments) => {
        if (payments == undefined) return [];
        return payments.map((payment) => {
          payment.camping = payment.camping == 1 ? true : false;
          return payment;
        });
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  /**
   * Service handle user checkout
   * @param {String} type
   * @param {Object} payload
   * @returns
   */
  static async checkout(type, payload) {
    try {
      // Check type payment
      if (!['cash', 'bank'].includes(type))
        throw 'Tipe pembayaran tidak tersedia';

      // Check payload payment
      PaymentValidate.pay(payload);

      // Get user
      const user = (await UserService.search(payload.user_id))[0];
      if (user.length == 0) throw 'User tidak tersedia';

      // Check Valid Date
      const day = new Day(payload.date);
      if (day.isExpired()) throw 'Tanggal telah kadaluarsa';

      // Check valid bank
      if (type == 'cash') {
        if (payload.bank != null)
          throw 'Bank tidak dapat digunakan jika pembayaran melalui cash';
      } else if (type == 'bank') {
        if (payload.bank == null) throw 'Harap mengisi pilihan bank';
      }

      // Generate valid packages with quantity and set gross_amount
      if (payload.camping == true) {
        if (_.isNull(payload.packages)) {
          throw 'Harap mengisi paket camping';
        }
      }
      const packages =
        payload.camping == true
          ? await PackageService.packagesToPayment(payload.packages)
          : null;

      // Generate valid tickets with quantity and set gross_amount
      const tickets = await TicketService.ticketsToPayment(
        payload.camping,
        day.isWeekend(),
        payload.tickets
      );

      // Set gross amount
      const gross_amount = await this.getGrossAmount(packages, tickets);

      // Make invoice
      const invoice = await this.createInvoice({
        user,
        date: payload.date,
        date_types: day.isWeekend() == false ? 'normal' : 'weekend',
        type,
        camping: payload.camping,
        bank: payload.bank,
        gross_amount,
        packages: payload.camping == true ? packages.items : [],
        tickets: tickets.items,
      });

      return invoice;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Function get gross amount on transaction
   * @param {Object} packages
   * @param {Object} tickets
   * @returns
   */
  static async getGrossAmount(packages, tickets) {
    const tax = 5000;
    const packagesGrossAmount =
      packages == null || packages == [] ? 0 : packages.gross_amount;
    return packagesGrossAmount + tickets.gross_amount + tax;
  }

  /**
   * Service create invoice
   * @param {Object} payload
   * @returns
   */
  static async createInvoice(payload) {
    const payment = {
      id: uuid(),
      order_id: `MDK${Uniq.randomNumbers(9)}`,
      user_id: payload.user.id,
      transaction_id: null,
      camping: payload.camping,
      type: payload.type,
      date: payload.date,
      date_types: payload.date_types,
      gross_amount: payload.gross_amount,
      barcode: null,
      expire_at: new Day(payload.date).expired(12),
    };

    // Check type
    let bank = {
      merchant: null,
      va_numbers: {
        bank: null,
        va_number: null,
      },
    };
    if (payload.type == 'bank') {
      // Create payment to bank
      await new Midtrans()
        .createTransaction({
          order_id: payment.order_id,
          bank: payload.bank,
          gross_amount: payment.gross_amount,
          fullname: payload.user.fullname,
          email: payload.user.email,
        })
        .then((transaction) => {
          payment.transaction_id = transaction.transaction_id;
          bank.merchant = transaction.merchant_id;
          bank.va_numbers.bank = transaction.va_numbers[0].bank;
          bank.va_numbers.va_number = transaction.va_numbers[0].va_number;
        });
    }

    const payment_detail = {
      id: uuid(),
      payment_id: payment.id,
      merchant: bank.merchant,
      name_bank: bank.va_numbers.bank,
      va_bank: bank.va_numbers.va_number,
    };

    const payment_packages =
      payload.packages.length != 0
        ? payload.packages.map((pkg) => {
            return {
              id: uuid(),
              payment_id: payment.id,
              package_id: pkg.id,
              quantity: pkg.quantity,
            };
          })
        : null;

    const payment_tickets = payload.tickets.map((tct) => ({
      id: uuid(),
      payment_id: payment.id,
      ticket_id: tct.id,
      name: tct.name,
      identity: tct.identity,
    }));

    // Make Barcode
    payment.barcode = await new Barcode({ text: payment.order_id }).save();

    // Insert to database
    return await knex('payments')
      .insert(payment)
      .then(async () => {
        // When payment types is bank
        if (payload.type == 'bank') {
          await knex('payment_detail')
            .insert(payment_detail)
            .catch((error) => {
              throw error;
            });
        }

        // When camping
        if (payload.camping) {
          await knex('payment_packages')
            .insert(payment_packages)
            .catch((error) => {
              throw error;
            });
        }

        // Insert tickets
        await knex('payment_tickets')
          .insert(payment_tickets)
          .catch((error) => {
            throw error;
          });

        return payment;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Service handle notification callback mitrans
   * @param {Object} payload
   */
  static async notification(payload) {
    await new Midtrans()
      .core()
      .transaction.notification(payload)
      .then(async (statusResponse) => {
        let transactionId = statusResponse.transaction_id;
        let transactionStatus = statusResponse.transaction_status;

        await this.changeStatus(transactionId, transactionStatus);
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Service update status transaction
   * @param {Object} payload
   */
  static async updateStatus(payload) {
    PaymentValidate.changeStatus(payload);

    return await knex('payments')
      .select()
      .where({ id: payload.id })
      .first()
      .then(async (transaction) => {
        if (transaction == undefined) throw 'Id tersebut tidak tersedia';

        if (transaction.bank != null || transaction.type == 'bank')
          throw 'Memperbarui status hanya dapat dilakukan pada pembayaran cash';

        return await this.changeStatus(payload.id, payload.status)
          .then(() => {
            return {
              id: payload.id,
              status: payload.status,
            };
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service change status transaction
   * @param {uuid} transaction_id
   * @param {String} status
   * @returns
   */
  static async changeStatus(transaction_id, status) {
    if (!['pending', 'settlement', 'expire', 'deny', 'cancel'].includes(status))
      throw 'Status order tidak valid';

    return await knex('payments')
      .where({ transaction_id })
      .orWhere({ id: transaction_id })
      .update({
        status,
      });
  }
}

module.exports = { PaymentService };
