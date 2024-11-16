import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

class Budget extends Model {}

Budget.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
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
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    spent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    period: {
      type: DataTypes.ENUM('MONTHLY', 'YEARLY'),
      allowNull: false,
      defaultValue: 'MONTHLY',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Budget',
  }
);

Budget.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Budget, { foreignKey: 'userId' });

export default Budget;