import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
		database: ':memory:'
  })

export default sequelize;
