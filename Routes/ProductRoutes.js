const express=require('express')
const {addProduct,getProducts,getProductById,updateProduct,deleteProduct }=require('../Controllers/ProductControllers')

const router=express.Router()

router.post('/products',addProduct);

router.get('/products', getProducts);

router.get('/products/:id', getProductById);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports=router