import {DataTypes} from 'sequelize';
import sequelize from '../data/db';

const Indications = sequelize.define('Indications', {
  id: {
    type: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  producers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Indications;