import {DataTypes} from 'sequelize';
import sequelize from '../data/dbConnection.js';

const Indication = sequelize.define('Indication', {
  id: {
    type: DataTypes.UUIDV4,
		defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
		allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
	studios: {
		type: DataTypes.STRING,
		allowNull: false,
	},
  producers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Indication;
