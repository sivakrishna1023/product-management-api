const Product = require('../DatabaseSchema/ProductSchema'); 
const ErrorHandler = require('../Utills/ErrorHandler')
const { Op } = require('sequelize');


const addProduct = async (req, res,next) => {
    try {
      const { name, price, description, category } = req.body;
  
      if (!name || !price || !category) {
        return next(new ErrorHandler("Name, price, and category are required",400));
      }
  
      const newProduct = await Product.create({
        name,
        price,
        description,
        category
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return next(error);
    }
  };  

const getProducts = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, name, category } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = parseInt(limit, 10) || 10;
  
      const filters = {};
      if (name) {
        filters.name = { [Op.like]: `%${name}%` }; 
      }
      if (category) {
        filters.category = { [Op.like]: `%${category}%` }; 
      }
  
     
      const { rows, count } = await Product.findAndCountAll({
        where: filters,
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      });
  
      
      res.status(200).json({
        totalProducts: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: pageNumber,
        products: rows,
      });
    } catch (error) {
      next(error); 
    }
  };
  



const getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByPk(id);
  
      if (!product) {
        return next(new ErrorHandler(`Product with ID ${id} not found`, 404));
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error); 
    }
  };
  
  
  const updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, description, category } = req.body;
  
      const product = await Product.findByPk(id);
  
      if (!product) {
        return next(new ErrorHandler(`Product with ID ${id} not found`, 404));
      }
  
      if (!name || !price || !category) {
        return next(new ErrorHandler("Name, price, and category are required", 400));
      }
  
      product.name = name;
      product.price = price;
      product.description = description || product.description; 
      product.category = category;
  
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      next(error); 
    }
  };
  
  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByPk(id);
  
      if (!product) {
        return next(new ErrorHandler(`Product with ID ${id} not found`, 404));
      }
  
      await product.destroy();
  
     
      res.status(200).json({ message: `Product with ID ${id} has been deleted` });
    } catch (error) {
      next(error); 
    }
  };
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
