import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

class Goal extends Model {}

Goal.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },
  },
  {
    sequelize,
    modelName: 'Goal',
  }
);

Goal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Goal, { foreignKey: 'userId' });

export default Goal;