const _ = require('lodash');
const { Mitrans } = require('../../config/mitrans');
const { v4: uuid } = require('uuid');
const { Uniq } = require('../../utils/uniq');
const { PaymentValidate } = require('./payment.validate');
const { UserService } = require('../user/user.service');
const { MapArray } = require('../../utils/mapArray');
const { knex } = require('../../config/database');
const { TicketService } = require('../ticket/ticket.services');

class PaymentService {
  static async get() {
    return await knex('payments')
      .select()
      .then((payments) =>
        payments.map((payment) => {
          return payment;
        })
      )
      .catch((error) => {
        throw Error(error);
      });
  }

  static async getById(id) {
    return await knex('payments')
      .select(
        'payments.*',
        'ticket_detail.id as id_ticket',
        'ticket_detail.payment_id',
        'ticket_detail.name',
        'ticket_detail.identity',
        'ticket_detail.created_at',
        'ticket_detail.updated_at',
        'tickets.id as ticket_id',
        'tickets.title',
        'tickets.normal_day',
        'tickets.weekend_day'
      )
      .leftJoin('ticket_detail', 'payments.id', 'ticket_detail.payment_id')
      .leftJoin('tickets', 'tickets.id', 'ticket_detail.ticket_id')
      .where({ 'payments.id': id })
      .orWhere({ 'payments.order_id': id })
      .then((payment) => {
        if (payment == undefined || payment.length == 0) return [];
        return _(payment)
          .groupBy('id')
          .map((groupRows) => ({
            id: groupRows[0].id,
            order_id: groupRows[0].order_id,
            user_id: groupRows[0].user_id,
            package_id: groupRows[0].package_id,
            type: groupRows[0].type,
            visit: groupRows[0].visit,
            day: groupRows[0].day,
            gross_amount: groupRows[0].gross_amount,
            status: groupRows[0].status,
            tickets: _.map(
              groupRows,
              ({
                id_ticket,
                title,
                normal_day,
                weekend_day,
                name,
                identity,
              }) => ({
                id: id_ticket,
                title,
                price: groupRows[0].day == 'weekend' ? weekend_day : normal_day,
                name,
                identity,
              })
            ),
            expire_at: groupRows[0].expire_at,
            created_at: groupRows[0].created_at,
            updated_at: groupRows[0].updated_at,
          }))
          .first();
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  static async getByUser(id) {
    return await knex('payments')
      .select()
      .where({ user_id: id })
      .then((payment) => {
        if (payment == undefined) return [];
        return payment;
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  static async checkout(type, body) {
    try {
      // Check type payment
      if (!['cash', 'bank'].includes(type))
        throw 'Tipe pembayaran tidak sesuai';
      if (type == 'cash') {
        // Create invoice Cash
        return await this.paymentCash(body);
      } else {
        // Create invoice Transfer Bank
        // -> Create payment
        // -> Create payment_detail
        // -> Create ticket
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async paymentCash(payload) {
    PaymentValidate.cash(payload);

    const { user_id, type, visit, day, tickets } = payload;

    // Get user
    const user = await UserService.getById(user_id);
    if (user.length == 0) throw 'User tidak tersedia';

    // Set ticket and get
    const ticketsGroup = MapArray.keyLength(MapArray.group(tickets, 'id'));
    const ticketsDetail = await this.getTicketsDetail(ticketsGroup, day);

    // Make Invoice
    const invoice = await this.createPayment({
      user_id: user.id,
      type,
      visit,
      day,
      gross_amount: ticketsDetail.gross_amount,
      status: 'pending',
      expire_at: 0,
      tickets: ticketsDetail,
    });
    return invoice;
  }

  static async paymentBank(payload) {}

  static async createPayment(payload) {
    const payment = {
      id: uuid(),
      order_id: `MDK${Uniq.randomNumberRange(100000000, 999999999)}`,
      user_id: payload.user_id,
      package_id: payload.package_id || null,
      type: payload.type,
      visit: payload.visit,
      day: payload.day,
      gross_amount: payload.gross_amount,
      status: payload.status,
      expire_at: payload.expire_at,
    };
    const tickets = await TicketService.generateTickets(
      payment.id,
      payload.tickets
    );
    return await knex('payments')
      .insert(payment)
      .then(async () => {
        // Create Ticket
        return await knex('ticket_detail')
          .insert(tickets)
          .then(() => {
            const showTickets = tickets.map((ticket) => {
              delete ticket.payment_id;
              return ticket;
            });
            return Object.assign(payment, { showTickets });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  static async getTicketsDetail(ticketsGroup, day) {
    let gross_amount = 0;
    const tickets = await TicketService.get();
    const ticketSelected = [];
    const tax = 5000;
    for (let i = 0; i < ticketsGroup.length; i++) {
      tickets.filter((tct) => {
        if (tct.id == ticketsGroup[i].id) {
          ticketSelected.push(tct);
          const price = day == 'weekend' ? tct.weekend_day : tct.normal_day;
          gross_amount += price * ticketsGroup[i].length;
        }
      });
    }
    if (gross_amount == 0) throw 'Harap memasukan tiket yang valid';
    return {
      tickets: { selected: ticketsGroup, detail: ticketSelected },
      gross_amount: (gross_amount += tax),
    };
  }

  static async charge(payload) {
    const params = {
      payment_type: 'bank_transfer',
      transaction_details: {
        gross_amount: 10000,
        order_id: `MDK${Uniq.randomNumberRange(100000000, 999999999)}`,
      },
      bank_transfer: {
        bank: 'bca',
      },
      customer_details: {
        first_name: 'Aristo caesar pratama',
        email: 'aristo.belakang@gmail.com',
      },
    };
    return Mitrans.core()
      .charge(params)
      .then((chargeResponse) => {
        return chargeResponse;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { PaymentService };
