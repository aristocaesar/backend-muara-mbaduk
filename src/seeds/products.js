const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      id: uuid(),
      title: 'Tenda Tendaki Kap.2 Orang',
      slug: 'tenda-tendaki-kap-2-orang',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 60000,
      compensation: 100000,
    },
    {
      id: uuid(),
      title: 'Tenda Miss Borneo Kap.2 Orang',
      slug: 'tenda-miss-borneo-kap-2-orang',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 80000,
      compensation: 125000,
    },
    {
      id: uuid(),
      title: 'Tenda Miss Borneo Kap.4 Orang',
      slug: 'tenda-miss-borneo-kap-4-orang',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 100000,
      compensation: 150000,
    },
    {
      id: uuid(),
      title: 'Kompor',
      slug: 'kompor',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 20000,
      compensation: 50000,
    },

    {
      id: uuid(),
      title: 'Gas Kaleng',
      slug: 'gas-kaleng',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 15000,
      compensation: 20000,
    },

    {
      id: uuid(),
      title: 'Nesting / Alat Masak',
      slug: 'nesting',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 20000,
      compensation: 50000,
    },
    {
      id: uuid(),
      title: 'Lampu Tenda',
      slug: 'lampu-tenda',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'Meja Kamping',
      slug: 'meja-kamping',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 15000,
      compensation: 25000,
    },
    {
      id: uuid(),
      title: 'Matras',
      slug: 'matras',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'cangkir',
      slug: 'cangkir',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 5000,
      compensation: 10000,
    },
    {
      id: uuid(),
      title: 'Sendok Dan Garbu',
      slug: 'sendok-dan-garbu',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 5000,
      compensation: 10000,
    },
  ]);
};
