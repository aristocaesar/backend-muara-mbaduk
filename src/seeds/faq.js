const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('faq').del();
  await knex('faq').insert([
    {
      id: uuid(),
      title: 'Apakah ada penjualan tiket di lokasi wisata muara mbaduk ?',
      description:
        'Seluruh pemesanan tiket WAJIB secara online melalui www.muarambaduk.info. Saat ini pemesanan dan penjualan tiket dilakukan secara online, pembayaran dilakukan pembayaran dengan  metode pembayaran langsung di pos layanan di lokasi sampai dan pembayaran secara tranfer melalui virtual account .',
    },
    {
      id: uuid(),
      title:
        'Apa syarat serta dokumen dalam pembelian tiket online masuk wisata muara mbaduk ?',
      description:
        'Id qui aliquip occaecat cillum amet. Magna fugiat aute eu consectetur incididunt cupidatat nulla culpa laboris duis elit eiusmod do. Dolore nulla culpa amet excepteur minim id labore. Eiusmod veniam sunt cupidatat irure occaecat. Ex in dolore in officia laborum deserunt pariatur cupidatat consequat officia.',
    },
    {
      id: uuid(),
      title: 'Bagaimana cara pembayaran tiket online?',
      description:
        'Id qui aliquip occaecat cillum amet. Magna fugiat aute eu consectetur incididunt cupidatat nulla culpa laboris duis elit eiusmod do. Dolore nulla culpa amet excepteur minim id labore. Eiusmod veniam sunt cupidatat irure occaecat. Ex in dolore in officia laborum deserunt pariatur cupidatat consequat officia.',
    },
    {
      id: uuid(),
      title: 'Bagaimana menuju lokasi wisata muara mbaduk ?',
      description:
        'Id qui aliquip occaecat cillum amet. Magna fugiat aute eu consectetur incididunt cupidatat nulla culpa laboris duis elit eiusmod do. Dolore nulla culpa amet excepteur minim id labore. Eiusmod veniam sunt cupidatat irure occaecat. Ex in dolore in officia laborum deserunt pariatur cupidatat consequat officia.',
    },
    {
      id: uuid(),
      title:
        'Apakah tiket yang sudah dibeli dapat dikembalikan atau ganti jadwal ?',
      description:
        'Id qui aliquip occaecat cillum amet. Magna fugiat aute eu consectetur incididunt cupidatat nulla culpa laboris duis elit eiusmod do. Dolore nulla culpa amet excepteur minim id labore. Eiusmod veniam sunt cupidatat irure occaecat. Ex in dolore in officia laborum deserunt pariatur cupidatat consequat officia.',
    },
  ]);
};
