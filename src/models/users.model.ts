import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password' | 'role' | 'name'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
