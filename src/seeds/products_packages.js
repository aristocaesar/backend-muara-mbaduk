const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries products
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
      title: 'Kursi Lipat',
      slug: 'kursi-lipat',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 15000,
      compensation: 25000,
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
      title: 'Panci',
      slug: 'panci',
      description: 'ini adalah deskripsi',
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'Cangkir',
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

  // Deletes ALL existing entries packages
  await knex('packages').del();
  await knex('packages').insert([
    {
      id: uuid(),
      title: 'STANDART 2',
      slug: 'paket-standart-2',
      summary: 'Ini bagian summary',
      description: 'Ini bagian deskripsi',
      price: 115000,
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
    },
    {
      id: uuid(),
      title: 'PREMIUM 2',
      slug: 'paket-premium-2',
      summary: 'Ini bagian summary',
      description: 'Ini bagian deskripsi',
      price: 135000,
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
    },
    {
      id: uuid(),
      title: 'PREMIUM 4',
      slug: 'paket-premium-4',
      summary: 'Ini bagian summary',
      description: 'Ini bagian deskripsi',
      price: 165000,
      image:
        'http://localhost:3000/static/uploads/1678611031380-B356DDBC-2C73-4842-A274-11EC1EBC31EF.png',
    },
  ]);

  // Deletes ALL existing entries packages_detail
  await knex('packages_detail').del();
  await knex('packages_detail').insert([
    // Standart 2
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Tenda Tendaki Kap.2 Orang',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Kursi Lipat',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Matras',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Lampu Tenda',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Kompor',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Gas Kaleng',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Panci',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Cangkir',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'STANDART 2',
      product: 'Sendok Dan Garbu',
      quantity: 2,
    },

    // Premium 2
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Tenda Miss Borneo Kap.2 Orang',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Kursi Lipat',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Matras',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Lampu Tenda',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Kompor',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Gas Kaleng',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Nesting / Alat Masak',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Cangkir',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'PREMIUM 2',
      product: 'Sendok Dan Garbu',
      quantity: 4,
    },

    // Premium 4
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Tenda Miss Borneo Kap.4 Orang',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Kursi Lipat',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Matras',
      quantity: 2,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Lampu Tenda',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Kompor',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Gas Kaleng',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Nesting / Alat Masak',
      quantity: 1,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Cangkir',
      quantity: 4,
    },
    {
      id: uuid(),
      package: 'PREMIUM 4',
      product: 'Sendok Dan Garbu',
      quantity: 6,
    },
  ]);
};
