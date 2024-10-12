const { DataTypes } = require('sequelize');
const sequelize = require('../Configurations/database'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false 
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false 
  }
}, {
  timestamps: true, 
  tableName: 'products' 
});

Product.sync()
  .then(() => {
    console.log('Product table created successfully!');
  })
  .catch(err => {
    console.error('Error creating table:', err);
  });

module.exports = Product;
