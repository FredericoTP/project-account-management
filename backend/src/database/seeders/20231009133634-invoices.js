'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('invoices', [
      {
        account_id: 1,
        expense_id: 1,
        value: 100.00,
        date: '2023-03-09',
      },
      {
        account_id: 1,
        expense_id: 2,
        value: 150.00,
        date: '2023-03-10',
      },
      {
        account_id: 1,
        expense_id: 5,
        value: 300.00,
        description: 'mercado do mês',
        date: '2023-02-11',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  },
};
