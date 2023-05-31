const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pages').del();
  await knex('pages').insert([
    {
      id: uuid(),
      pages: 'Tentang',
      slug: 'about',
      body: '<p>Muara Mbaduk di Banyuwangi adalah kawasan wisata alam yang menawarkan pemandangan yang luar<br>biasa indah. Terletak sekitar 25 km di sebelah barat kota Banyuwangi, Muara Mbaduk adalah tempat yang<br>ideal bagi wisatawan yang mencari pengalaman wisata alam yang berbeda.<br><br>Hamparan pasir putih dan lautan yang biru di Muara Mbaduk adalah salah satu daya tarik utama tempat<br>ini. Wisatawan dapat menikmati aktivitas berenang, berjemur di pantai, atau sekadar menikmati<br>pemandangan indah yang disajikan oleh alam.<br><br>Di sepanjang sungai Mbaduk yang mengalir ke laut, tumbuh hutan bakau yang subur. Wisatawan dapat<br>menaiki perahu nelayan atau perahu wisata untuk menjelajahi hutan bakau tersebut, sambil menikmati<br>keindahan alam sekitar. Selain itu, Muara Mbaduk juga terkenal sebagai spot surfing yang menarik, karena<br>ombaknya yang besar dan cocok untuk para surfer.<br><br>Muara Mbaduk juga menawarkan berbagai aktivitas air seperti snorkeling dan diving untuk menikmati<br>keindahan bawah laut. Terdapat pula beberapa warung makan di sekitar kawasan wisata Muara Mbaduk<br>yang menyajikan makanan khas Banyuwangi yang lezat dan terjangkau.<br><br>Secara keseluruhan, Muara Mbaduk adalah tempat yang ideal bagi wisatawan yang mencari pengalaman<br>wisata alam yang berbeda di Banyuwangi. Dengan keindahan alamnya yang menakjubkan, Muara Mbaduk<br>pasti akan meninggalkan kesan yang tak terlupakan bagi semua pengunjungnya.</p>',
    },
    {
      id: uuid(),
      pages: 'Syarat dan Ketentuan',
      slug: 'terms-of-service',
      body: '<p>Berikut adalah syarat dan ketentuan yang berlaku pada wisata Muara Mbaduk, Banyuwangi:<br><br>Setiap pengunjung wajib membayar tiket masuk sebelum masuk ke kawasan wisata Muara Mbaduk. Harga<br>tiket masuk dapat berbeda-beda tergantung pada kategori pengunjung, seperti warga lokal atau<br>wisatawan asing.<br><br>Setiap pengunjung diharuskan mengikuti peraturan dan instruksi yang diberikan oleh petugas kawasan<br>wisata, termasuk menjaga kebersihan lingkungan dan tidak merusak flora dan fauna di sekitar kawasan<br>wisata.<br><br>Aktivitas yang dapat membahayakan keselamatan diri dan pengunjung lainnya, seperti memancing di<br>daerah yang dilarang, atau mendekati ombak yang berbahaya, dilarang keras.<br><br>Setiap pengunjung diharapkan mengikuti jam operasional yang telah ditentukan oleh pihak kawasan<br>wisata. Jam operasional dapat berbeda-beda tergantung pada musim atau hari libur nasional.<br><br>Dilarang membawa barang-barang berbahaya atau bahan-bahan yang ilegal ke dalam kawasan wisata<br>Muara Mbaduk.<br><br>Dilarang melakukan kegiatan yang merusak keindahan alam, seperti membuang sampah sembarangan,<br>merusak terumbu karang, atau melakukan kegiatan yang merusak flora dan fauna.<br><br>Dilarang membawa binatang peliharaan atau hewan ke dalam kawasan wisata Muara Mbaduk.<br><br>Setiap pengunjung diharapkan menghormati budaya dan adat istiadat setempat serta tidak melakukan<br>kegiatan yang melanggar hukum dan norma sosial.<br><br>Pihak kawasan wisata Muara Mbaduk berhak untuk membatalkan tiket masuk dan mengusir pengunjung<br>yang melanggar aturan dan ketentuan yang telah ditetapkan.<br><br>Pengunjung diharapkan mematuhi protokol kesehatan yang telah ditetapkan oleh pihak kawasan wisata<br>&nbsp;termasuk memakai masker dan menjaga jarak sosial untuk mencegah penyebaran COVID-19.</p>',
    },
    {
      id: uuid(),
      pages: 'Syarat Pemesanan',
      slug: 'terms-order',
      body: '<p>Tetap menjaga kesehatan dan mengikuti protokol kesehatan</p><p>Pengunjung dalam keadaan siap secara fisik dan mental.</p><p>Tiket tidak termasuk asuransi, semua pengunjung disarankan untuk memiliki asuransi kecelakaan pribadi</p><p>Tiket atau pemesaan yang sudah dibayar tidak dapat dirubah hai berkunjungnya serta tidak dapat dibatalkan dan uang tidak dapat dikembalikan.</p><p>Dengan membaca dan check list berarti anda setuju dengan syarat dan kondisi </p>',
    },
    {
      id: uuid(),
      pages: 'Kebijakan Privasi',
      slug: 'privacy-policy',
      body: '<p>Berikut adalah syarat dan ketentuan yang berlaku pada wisata Muara Mbaduk, Banyuwangi:<br><br>Setiap pengunjung wajib membayar tiket masuk sebelum masuk ke kawasan wisata Muara Mbaduk. Harga<br>tiket masuk dapat berbeda-beda tergantung pada kategori pengunjung, seperti warga lokal atau<br>wisatawan asing.<br><br>Setiap pengunjung diharuskan mengikuti peraturan dan instruksi yang diberikan oleh petugas kawasan<br>wisata, termasuk menjaga kebersihan lingkungan dan tidak merusak flora dan fauna di sekitar kawasan<br>wisata.<br><br>Aktivitas yang dapat membahayakan keselamatan diri dan pengunjung lainnya, seperti memancing di<br>daerah yang dilarang, atau mendekati ombak yang berbahaya, dilarang keras.<br><br>Setiap pengunjung diharapkan mengikuti jam operasional yang telah ditentukan oleh pihak kawasan<br>wisata. Jam operasional dapat berbeda-beda tergantung pada musim atau hari libur nasional.<br><br>Dilarang membawa barang-barang berbahaya atau bahan-bahan yang ilegal ke dalam kawasan wisata<br>Muara Mbaduk.<br><br>Dilarang melakukan kegiatan yang merusak keindahan alam, seperti membuang sampah sembarangan,<br>merusak terumbu karang, atau melakukan kegiatan yang merusak flora dan fauna.<br><br>Dilarang membawa binatang peliharaan atau hewan ke dalam kawasan wisata Muara Mbaduk.<br><br>Setiap pengunjung diharapkan menghormati budaya dan adat istiadat setempat serta tidak melakukan<br>kegiatan yang melanggar hukum dan norma sosial.<br><br>Pihak kawasan wisata Muara Mbaduk berhak untuk membatalkan tiket masuk dan mengusir pengunjung<br>yang melanggar aturan dan ketentuan yang telah ditetapkan.<br><br>Pengunjung diharapkan mematuhi protokol kesehatan yang telah ditetapkan oleh pihak kawasan wisata<br>&nbsp;termasuk memakai masker dan menjaga jarak sosial untuk mencegah penyebaran COVID-19.</p>',
    },
    {
      id: uuid(),
      pages: 'Informasi Terbaru',
      slug: 'latest-informations',
      body: '<p>Web ini untuk fasilitas pemesanan tiket masuk kawasan wisata alam Muara Mbaduk.</p><p>Booking tiket wajib secara online, melalui web ini, tunjukkan kode booking kepada petugas dan lakukan pembayaran dengan tranfer atau manual untuk dapatkan e-ticket.</p><p>Untuk wisatawan atau pengunjung yang akan berkemah siapkan KTP/Kartu Identitas lain untuk mengisi pemesanan, dan Membawa KTP/Kartu Identitas untuk Check in kawasan, Tanpa dokumen itu, berpotensi ditolak masuk kawasan.</p><p>Penjelasan rinci silahkan membaca aturan di menu FAQ (Frequently Asked Questions).</p><p>Mohon kiranya dapat mengisi kuisioner melalui tautan <a data-fr-linked="true" href="http://muarambaduk.info/kuisioner">http://muarambaduk.info/kuisioner</a> untuk peningkatan pelayanan kami</p>',
    },
  ]);
};
