import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class ExpenseModel extends Model {
  declare id: number;

  declare expense: string;
}

ExpenseModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER,
    },
    expense: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'expenses',
    timestamps: false,
    underscored: true,
  },
);
