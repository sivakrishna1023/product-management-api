const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://Learndb_owner:2TsRtSCapbq0@ep-gentle-lab-a5r7jjit.us-east-2.aws.neon.tech/Learndb?sslmode=require', {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
