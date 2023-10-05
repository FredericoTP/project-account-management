import {
  Model, INTEGER, STRING, BOOLEAN,
} from 'sequelize';
import db from '.';

class AccountModel extends Model {
  declare id: number;

  declare name: string;

  declare email: string;

  declare password: string;

  declare status: boolean;
}

AccountModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER,
    },
    name: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
    status: {
      allowNull: false,
      defaultValue: true,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
    underscored: true,
  },
);
