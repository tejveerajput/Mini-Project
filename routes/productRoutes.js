const express = require('express') ;
const router = express.Router() ;
const Product = require('../models/Product');
const Review = require('../models/Review');


// Home Page
router.get('/products', async (req, res)=>{
    try{
        let products = await Product.find({}) ;
        res.render('products/index', {products}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
    
})

// Form for adding new product
router.get('/products/new', async (req, res)=>{
    try{
        let products = await Product.find({}) ;
        res.render('products/new', {products}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
    
})

// Home Page after adding new product
router.post('/products', async (req, res)=>{
    try{
        let {name, img, price, desc} = req.body ;
        await Product.create({name, img, price, desc}) ;
        res.redirect('products') ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

// To view specific product
router.get('/products/:id', async (req, res)=>{
    try{
        let {id} = req.params ;
        let foundProduct = await Product.findById(id).populate('reviews') ;
        res.render('products/show', {foudProduct}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

// Form to edit the product
router.get('/products/:id/edit', async (req, res)=>{
    try{
        let {id} = req.params ;
        let foundProduct = await Product.findById(id) ;
        res.render('products/edit', {foundProduct}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

// after editing the product
router.patch('/products/:id', async(req, res)=>{
    try{
        let {id} = req.params ;
        let {name, img, price, desc} = req.body ;
        await Product.findByIdAndUpdate(id, {name, img, price, desc}) ;
        res.redirect(`/products/${id}`) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

// Deleting a product
router.delete('/products/:id', async (req, res)=>{
    try{
        let {id} = req.params ;
        let foundProduct = await Product.findById(id) ;

        for(let item of foundProduct.reviews){
            await Review.findByIdAndDelete(item) ;
        }

        await Product.findByIdAndDelete(id) ;
        res.redirect('/products') ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

module.exports = router ;