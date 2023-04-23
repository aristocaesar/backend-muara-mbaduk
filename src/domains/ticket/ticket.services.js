const { result } = require('lodash');
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
        date_types: false,
        camping: body.camping,
        tickets: [],
        packages: [],
      };

      // Check Weekend
      available.date_types =
        new Day(available.date).isWeekend() == false ? 'normal' : 'weekend';

      // Check Ticket
      available.tickets = await this.get().then((tickets) => {
        const items = tickets.filter((ticket) =>
          available.camping == true
            ? ticket.title != 'Tanpa Berkemah'
            : ticket.title != 'Berkemah'
        );
        return items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            category: item.category,
            price:
              available.date_types == 'normal'
                ? item.normal_day
                : item.weekend_day,
          };
        });
      });

      // Get Packages when camping == true
      available.packages =
        available.camping == true
          ? await PackageService.getByCategory('general')
          : [];

      return available;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Service generate tickets for transactios
   * @param {String} camping
   * @param {String} date_types
   * @param {Object} tickets
   * @returns
   */
  static async ticketsToPayment(camping, date_types, tickets) {
    const allTickets = await this.get();
    let gross_amount = 0;
    let ticketsValid = [];

    for (let i = 0; i < tickets.length; i++) {
      for (let j = 0; j < allTickets.length; j++) {
        // Check when same id
        if (tickets[i].id == allTickets[j].id) {
          // Check when ticket camping
          if (camping) {
            if (allTickets[j].category != 'transport') {
              if (tickets[i].name == null || tickets[i].identity == null) {
                throw 'Harap melengkapi identitas';
              }
            } else {
              if (tickets[i].identity == null) {
                throw 'Harap melengkapi identitas';
              }
            }
          }

          // Create information ticket
          ticketsValid.push({
            id: allTickets[j].id,
            price:
              date_types == 'normal'
                ? allTickets[j].normal_day
                : allTickets[j].weekend_day,
            name: camping == true ? tickets[i].name : null,
            identity: camping == true ? tickets[i].identity : null,
          });

          // Set price tickets
          gross_amount +=
            date_types == 'normal'
              ? allTickets[j].normal_day
              : allTickets[j].weekend_day;
        }
      }
    }

    if (gross_amount == 0 || ticketsValid.length == 0)
      throw 'Tiket yang dimasukkan tidak valid';

    return {
      items: ticketsValid,
      gross_amount,
    };
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
