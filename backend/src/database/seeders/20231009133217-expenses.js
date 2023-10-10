'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('expenses', [
      {
        expense: 'Água',
      },
      {
        expense: 'Luz',
      },
      {
        expense: 'Internet',
      },
      {
        expense: 'Lazer',
      },
      {
        expense: 'Alimentação',
      },
      {
        expense: 'Aluguel',
      },
      {
        expense: 'Outros',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('expenses', null, {});
  },
};
