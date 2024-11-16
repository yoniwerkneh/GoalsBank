import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(
        'INCOME',
        'FOOD',
        'SHOPPING',
        'ENTERTAINMENT',
        'BILLS',
        'TRANSPORT',
        'HEALTH',
        'OTHER'
      ),
      allowNull: false,
      defaultValue: 'OTHER',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
  }
);

export default Transaction;