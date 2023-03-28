const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('testimonials').del();
  await knex('testimonials').insert([
    {
      id: uuid(),
      fullname: 'Tasya FBI',
      images:
        'https://awsimages.detik.net.id/community/media/visual/2021/07/08/jisoo-blackpink_43.jpeg?w=700&q=90',
      star: 5,
      description:
        'Fugiat minim sunt sunt enim minim irure esse velit. Velit nostrud et ad tempor ex exercitation culpa reprehenderit sunt proident ea. Aliquip qui enim reprehenderit reprehenderit quis ipsum ut non dolor minim. Quis irure ad aliqua aliqua minim excepteur labore. Est cillum nostrud aliquip eu ut consectetur laboris incididunt incididunt quis eiusmod. Sunt consequat ea consequat occaecat eiusmod anim duis cillum.',
    },
    {
      id: uuid(),
      fullname: 'Syahiba Syaufa',
      images:
        'https://awsimages.detik.net.id/community/media/visual/2021/07/08/jisoo-blackpink_43.jpeg?w=700&q=90',
      star: 4,
      description:
        'Laboris cupidatat dolore voluptate aute tempor anim ipsum sunt ullamco laborum voluptate deserunt et. Incididunt voluptate anim et voluptate ex ea eu ipsum cillum tempor labore proident consectetur velit. Commodo nulla nostrud ut dolore ipsum occaecat tempor aliquip ex minim.',
    },
    {
      id: uuid(),
      fullname: 'Riris Vita Alvia',
      images:
        'https://awsimages.detik.net.id/community/media/visual/2021/07/08/jisoo-blackpink_43.jpeg?w=700&q=90',
      star: 5,
      description:
        'Cupidatat consequat fugiat mollit velit quis enim adipisicing minim do irure. Sint consequat velit id voluptate et officia consectetur minim adipisicing dolor tempor. Non duis proident et magna magna dolor cillum.',
    },
  ]);
};
