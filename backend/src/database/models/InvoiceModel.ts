import {
  Model, INTEGER, FLOAT, DATEONLY,
} from 'sequelize';
import db from '.';

class InvoiceModel extends Model {
  declare id: number;

  declare accountId: number;

  declare expenseId: number;

  declare value: number;

  declare date: string;
}

InvoiceModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER,
    },
    accountId: {
      allowNull: false,
      type: INTEGER,
    },
    expenseId: {
      allowNull: false,
      type: INTEGER,
    },
    value: {
      allowNull: false,
      type: FLOAT,
    },
    date: {
      allowNull: false,
      type: DATEONLY,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: db,
    modelName: 'invoices',
    timestamps: false,
    underscored: true,
  },
);
