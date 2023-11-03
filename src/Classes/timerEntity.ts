import {Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/mydb.sqlite"
});


export class TimerEntity extends Model {

}

TimerEntity.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Timer",
  }
);