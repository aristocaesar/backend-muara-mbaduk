require('dotenv').config();
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
      description:
        'Tenda Tendaki dengan kapasitas 2 orang dirancang untuk memberikan perlindungan dan kenyamanan bagi dua orang saat berkemah, Tenda Tendaki 2 Orang adalah pilihan sempurna bagi pasangan atau dua orang yang ingin berkemah dengan nyaman dan aman. Dengan desain yang kuat, perlindungan yang baik terhadap elemen alam, serta kemudahan penggunaan dan portabilitas, tenda ini akan menjadi teman setia Anda dalam berkemah di muarambaduk.',
      image: `${process.env.APP_URI}/static/uploads/tenda-tendaki-2.jpeg`,
      price: 60000,
      compensation: 100000,
    },
    {
      id: uuid(),
      title: 'Tenda Miss Borneo Kap.2 Orang',
      slug: 'tenda-miss-borneo-kap-2-orang',
      description:
        'Tenda Miss Borneo dengan kapasitas 2 orang dirancang untuk memberikan perlindungan dan kenyamanan bagi dua orang saat berkemah, Tenda Miss Borneo 2 Orang adalah pilihan sempurna bagi pasangan atau dua orang yang ingin berkemah dengan nyaman dan aman. Dengan desain yang kuat, perlindungan yang baik terhadap elemen alam, serta kemudahan penggunaan dan portabilitas, tenda ini akan menjadi teman setia Anda dalam berkemah di muarambaduk.',
      image: `${process.env.APP_URI}/static/uploads/tenda-borneo-2.jpg`,
      price: 80000,
      compensation: 125000,
    },
    {
      id: uuid(),
      title: 'Tenda Miss Borneo Kap.4 Orang',
      slug: 'tenda-miss-borneo-kap-4-orang',
      description:
        'Tenda Miss Borneo dengan kapasitas 4 orang dirancang untuk memberikan perlindungan dan kenyamanan bagi dua orang saat berkemah, Tenda Miss Borneo 4 Orang adalah pilihan sempurna bagi pasangan atau dua orang yang ingin berkemah dengan nyaman dan aman. Dengan desain yang kuat, perlindungan yang baik terhadap elemen alam, serta kemudahan penggunaan dan portabilitas, tenda ini akan menjadi teman setia Anda dalam berkemah di muarambaduk.',
      image: `${process.env.APP_URI}/static/uploads/tenda-borneo-4.jpg`,
      price: 100000,
      compensation: 150000,
    },
    {
      id: uuid(),
      title: 'Kompor',
      slug: 'kompor',
      description:
        'Kompor camping adalah perangkat penting bagi para petualang dan pecinta alam yang ingin memasak makanan di luar ruangan. Dengan desain yang portabel, kemudahan penggunaan, keamanan, dan ketahanan terhadap cuaca, kompor camping memastikan Anda dapat menikmati hidangan yang hangat dan lezat.',
      image: `${process.env.APP_URI}/static/uploads/kompor.jpeg`,
      price: 20000,
      compensation: 50000,
    },

    {
      id: uuid(),
      title: 'Gas Kaleng',
      slug: 'gas-kaleng',
      description:
        'Gas kaleng camping adalah pilihan yang ideal bagi para penggemar aktivitas outdoor yang ingin memasak makanan dengan mudah dan nyaman saat berkemah. Dengan kemampuan portabel, kemudahan penggunaan, keamanan, dan kapasitas yang beragam, gas kaleng camping memberikan solusi praktis dan efisien untuk memasak di alam terbuka.',
      image: `${process.env.APP_URI}/static/uploads/gas.jpeg`,
      price: 15000,
      compensation: 20000,
    },

    {
      id: uuid(),
      title: 'Nesting / Alat Masak',
      slug: 'nesting',
      description:
        'Nesting cookware adalah solusi praktis dan efisien untuk kegiatan camping atau berkemah di alam terbuka. Dengan desain yang kompak, bahan tahan panas, variasi ukuran, dan fitur-fitur khusus, nesting cookware memudahkan para petualang untuk memasak makanan dengan mudah dan efisien di tengah alam terbuka.',
      image: `${process.env.APP_URI}/static/uploads/nesting.jpeg`,
      price: 20000,
      compensation: 50000,
    },
    {
      id: uuid(),
      title: 'Lampu Tenda',
      slug: 'lampu-tenda',
      description:
        'Lampu tenda camping adalah perangkat pencahayaan yang penting saat berkemah di alam terbuka. Dengan desain portabel, berbagai sumber daya energi, kemampuan penyesuaian kecerahan, dan ketahanan terhadap air dan benturan, lampu tenda ini memberikan pencahayaan yang aman dan nyaman dalam pengalaman camping Anda.',
      image: `${process.env.APP_URI}/static/uploads/lampu.jpeg`,
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'Kursi Lipat',
      slug: 'kursi-lipat',
      description:
        'Kursi lipat camping adalah perangkat yang penting untuk menciptakan area duduk yang nyaman dan praktis saat berkemah di alam terbuka. Dengan desain portabel, konstruksi tahan lama, kenyamanan pengguna, stabilitas, dan kemudahan penggunaan, kursi lipat camping memastikan Anda dapat menikmati momen istirahat yang nyaman selama perjalanan camping Anda.',
      image: `${process.env.APP_URI}/static/uploads/kursi-lipat.jpg`,
      price: 15000,
      compensation: 25000,
    },
    {
      id: uuid(),
      title: 'Meja Kamping',
      slug: 'meja-kamping',
      description:
        'Meja camping memiliki desain yang portabel dan ringkas. Mereka dirancang untuk dapat dilipat atau dibongkar dengan mudah, sehingga memudahkan transportasi dan penyimpanan saat sedang dalam perjalanan. Meja camping dapat dengan cepat dipasang dan dipasangkan kembali saat dibutuhkan, memberikan kenyamanan dan kemudahan penggunaan yang tinggi.',
      image: `${process.env.APP_URI}/static/uploads/meja.jpg`,
      price: 15000,
      compensation: 25000,
    },
    {
      id: uuid(),
      title: 'Matras',
      slug: 'matras',
      description:
        'Matras camping adalah perangkat yang penting untuk menciptakan kenyamanan tidur yang optimal saat berkemah di alam terbuka. Dengan desain portabel, konstruksi yang nyaman, ukuran yang bervariasi, kemudahan penggunaan, ketahanan terhadap cuaca, dan kapasitas berat yang baik, matras camping memastikan Anda mendapatkan tidur yang nyenyak dan istirahat yang berkualitas selama perjalanan camping Anda.',
      image: `${process.env.APP_URI}/static/uploads/matras.jpeg`,
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'Panci',
      slug: 'panci',
      description:
        'Panci camping umumnya terbuat dari bahan yang tahan terhadap panas, goresan, dan karat seperti aluminium atau stainless steel. Bahan-bahan ini tidak hanya memberikan kekuatan dan durabilitas, tetapi juga membuat panci ringan dan mudah untuk dibawa saat melakukan perjalanan. Keberatannya yang rendah memungkinkan Anda menghemat ruang dan mengangkutnya dengan mudah.',
      image: `${process.env.APP_URI}/static/uploads/panci-masak.jpg`,
      price: 10000,
      compensation: 15000,
    },
    {
      id: uuid(),
      title: 'Cangkir',
      slug: 'cangkir',
      description:
        'Cangkir untuk camping adalah perangkat yang dirancang khusus untuk memberikan kemudahan dan kenyamanan saat minum di alam terbuka, Cangkir camping umumnya terbuat dari bahan yang tahan terhadap panas, goresan, dan pecah seperti stainless steel, aluminium, atau plastik berkualitas tinggi. Bahan-bahan ini memberikan kekuatan dan ketahanan yang diperlukan dalam kondisi camping, sementara tetap menjaga cangkir tetap ringan dan mudah dibawa saat melakukan perjalanan.',
      image: `${process.env.APP_URI}/static/uploads/cangkir.jpeg`,
      price: 5000,
      compensation: 10000,
    },
    {
      id: uuid(),
      title: 'Sendok Dan Garbu',
      slug: 'sendok-dan-garbu',
      description:
        'Sendok garbu camping adalah alat makan yang penting saat berkemah di alam terbuka. Dengan desain multifungsi, bahan yang tahan dan ringan, desain portabel, kemudahan penggunaan, kemudahan pembersihan. sendok garbu camping memastikan Anda dapat menikmati makanan dengan nyaman dan praktis selama perjalanan camping Anda.',
      image: `${process.env.APP_URI}/static/uploads/sendok-garbu.jpg`,
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
      category: 'general',
      description:
        'Paket Kemah Standar 2 adalah sebuah paket lengkap yang dirancang khusus untuk memenuhi kebutuhan camping dua orang dengan peralatan standart. Paket ini dilengkapi dengan berbagai produk penting untuk mendukung kenyamanan dan kepraktisan saat berkemah.',
      price: 115000,
      image: `${process.env.APP_URI}/static/uploads/tenda-tendaki-2.jpeg`,
    },
    {
      id: uuid(),
      title: 'PREMIUM 2',
      slug: 'paket-premium-2',
      category: 'general',
      description:
        'Paket Kemah Premium 2 adalah sebuah paket lengkap yang dirancang khusus untuk memenuhi kebutuhan camping dua orang dengan peralatan premium. Paket ini dilengkapi dengan berbagai produk penting untuk mendukung kenyamanan dan kepraktisan saat berkemah.',
      price: 135000,
      image: `${process.env.APP_URI}/static/uploads/tenda-borneo-2.jpg`,
    },
    {
      id: uuid(),
      title: 'PREMIUM 4',
      slug: 'paket-premium-4',
      category: 'general',
      description:
        'Paket Kemah Premium 4 adalah sebuah paket lengkap yang dirancang khusus untuk memenuhi kebutuhan camping empat orang dengan peralatan premium. Paket ini dilengkapi dengan berbagai produk penting untuk mendukung kenyamanan dan kepraktisan saat berkemah.',
      price: 165000,
      image: `${process.env.APP_URI}/static/uploads/tenda-borneo-4.jpg`,
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
