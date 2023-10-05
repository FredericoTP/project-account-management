'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      expense_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'expenses',
          key: 'id',
        },
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('invoices');
  },
};
