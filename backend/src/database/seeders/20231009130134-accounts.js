'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: '12345678',
        status: 1,
      },
      {
        name: 'Ichigo Kurosaki',
        email: 'ichigo@email.com',
        password: 'abcdefgh',
        status: 1,
      },
      {
        name: 'Asada Shino',
        email: 'sinon@email.com',
        password: '123454321',
        status: 0,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
