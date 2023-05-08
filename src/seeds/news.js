require('dotenv').config();
const { v4: uuid } = require('uuid');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('news').del();
  await knex('news').insert([
    {
      id: uuid(),
      title: 'Muara Mbaduk, Tempat Wisata Alam Kekinian di Banyuwangi',
      slug: 'muara-mbaduk-tempat-wisata-alam-kekinian-di-banyuwangi',
      body: 'BANYUWANGI, KOMPAS.com - Muara Mbaduk di Banyuwangi, Jawa Timur, adalah salah satu tempat wisata yang sedang populer di kalangan wisatawan. Muara Mbaduk terletak di Desa Sarongan, Kecamatan Pesanggaran, Banyuwangi. Tempat wisata ini berjarak 80 kilometer dari pusat Kota Banyuwangi atau bisa ditempuh dalam dua jam perjalanan. Muara Mbaduk memanjakan mata wisatawan dengan pemandangan alam yang indah.Lokasinya terletak di muara Sungai Buyuk, yaitu sungai yang melintasi Desa Sarongan dan Desa Kandangan. Di sekelilingnya juga tampak hamparan pegunungan yang hijau nan asri. Sementara itu, di sisi selatan merupakan pantai yang berbatasan langsung dengan Taman Nasional Meru Betiri. Pengunjung umumnya memilih berkemah di tempat wisata ini lantaran mereka memburu indahnya pemandangan matahari terbit di sela-sela pegunungan. Adapun tempat ini dapat dijadikan lokasi camping karena terdapat hamparan rerumputan yang cukup luas. Lokasinya terletak di muara Sungai Buyuk, yaitu sungai yang melintasi Desa Sarongan dan Desa Kandangan. Di sekelilingnya juga tampak hamparan pegunungan yang hijau nan asri. Sementara itu, di sisi selatan merupakan pantai yang berbatasan langsung dengan Taman Nasional Meru Betiri. Pengunjung umumnya memilih berkemah di tempat wisata ini lantaran mereka memburu indahnya pemandangan matahari terbit di sela-sela pegunungan. Adapun tempat ini dapat dijadikan lokasi camping karena terdapat hamparan rerumputan yang cukup luas.',
      thumbnail: `${process.env.APP_URI}/static/uploads/default-package.jpg`,
      author: null,
    },
  ]);
};
