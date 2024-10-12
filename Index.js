const express = require('express');
const productRoutes = require('./Routes/ProductRoutes');
const bodyParser = require('body-parser');

const sequelize = require('./Configurations/database'); 


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


testConnection();

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/",productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});