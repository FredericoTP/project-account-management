'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: '$2a$10$gkdj4fJb.bqLpDBzVuQQf.pRRQfEKIR86maGiGeeP0wrV08wR9iIW', // 12345678
        status: 1,
      },
      {
        name: 'Ichigo Kurosaki',
        email: 'ichigo@email.com',
        password: '$2a$10$raExpxEkK8nuh/ogT8Mx.esi8gr03V22kKyg.hgYr/flPQDDkocxC', // abcdefgh
        status: 1,
      },
      {
        name: 'Asada Shino',
        email: 'sinon@email.com',
        password: '$2a$10$oketqqFiy8lJ.syMRLXeROqwA73/3f.YGyjAGhg0g0P8Z059/SPT6', // 123454321
        status: 0,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
