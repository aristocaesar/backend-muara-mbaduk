const { knex } = require('../../config/database');
const { Day } = require('../../utils/day');
const { PackageService } = require('../package/package.services');
const { Ticket } = require('./ticket.model');
const { TicketValidate } = require('./ticket.validate');
const { v4: uuid } = require('uuid');

class TicketService {
  /**
   * Service get all ticket
   * @returns
   */
  static async get() {
    return await knex('tickets')
      .select()
      .orderBy('category', 'asc')
      .then((tickets) => tickets.map((ticket) => new Ticket(ticket).toJson()))
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get ticket by id
   * @param {String} id
   * @returns
   */
  static async getById(id) {
    return await knex('tickets')
      .select()
      .where({ id })
      .first()
      .then((ticket) => {
        if (ticket == undefined) return [];
        return new Ticket(ticket).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get ticket by category
   * @param {String} category
   * @returns
   */
  static async getByCategory(category) {
    return await knex('tickets')
      .select()
      .where({ category })
      .then((tickets) => tickets.map((ticket) => new Ticket(ticket).toJson()))
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async generateTickets(payment_id, ticketsDetail) {
    const { selected, detail } = ticketsDetail.tickets;
    let tickets = [];
    for (let i = 0; i < selected.length; i++) {
      detail.filter((ticket) => {
        if (ticket.id == selected[i].id) {
          for (let j = 0; j < selected[i].length; j++) {
            tickets.push({
              id: uuid(),
              payment_id,
              ticket_id: ticket.id,
              name: null,
              identity: null,
            });
          }
        }
      });
    }
    return tickets;
  }

  /**
   * Service store ticket
   * @param {Object} body
   * @returns
   */
  static async store(body) {
    TicketValidate.valid(body);

    const ticket = Object.assign({ id: uuid() }, body);
    return await knex('tickets')
      .insert(ticket)
      .then((stored) => {
        if (stored == 1) throw 'Terjadi kesalahan saat menambahkan tiket';
        return new Ticket(body).toJson();
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error('Tiket ini sudah tersedia');
        throw new Error(error);
      });
  }

  /**
   * Service checkin ticket
   * @param {Object} body
   * @returns
   */
  static async checkin(body) {
    try {
      TicketValidate.checkin(body);

      const available = {
        date: body.date,
        weekend: false,
        camping: body.camping,
        tickets: [],
        packages: [],
      };
      // Check Weekend
      available.weekend = Day.checkWeekend(available.date);
      // Set date to string
      available.date = Day.dateToString(body.date);
      // Check Ticket
      available.tickets = await this.get().then((tickets) => {
        return tickets.filter((ticket) =>
          available.camping == true
            ? ticket.title != 'Tanpa Berkemah'
            : ticket.title != 'Berkemah'
        );
      });

      return available;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Service update ticket
   * @param {String} id
   * @param {Object} body
   * @returns
   */
  static async update(id, body) {
    TicketValidate.valid(body);

    return await knex('tickets')
      .update(body)
      .where({ id })
      .then((updated) => {
        if (updated == 0) throw 'Terjadi kesalahan saat memperbarui tiket';
        return new Ticket(body).toJson();
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error('Tiket ini sudah tersedia');
        throw new Error(error);
      });
  }

  /**
   * Service delete ticket where id
   * @param {String} id
   * @returns
   */
  static async delete(id) {
    return await knex('tickets')
      .where({ id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau tiket tersebut tidak tersedia';
        return 'Tiket berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { TicketService };
