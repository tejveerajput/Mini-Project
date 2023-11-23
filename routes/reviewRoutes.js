const express = require('express') ;
const router = express.Router() ;
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview} = require('../middleware') ;

router.post('/products/:id/review', validateReview, async (req, res)=>{
    try{
        let {id} = req.params ;
        let {rating, comment} = req.body ;

        let foundProduct = await Product.findById(id) ;
        let review = new Review({rating, comment}) ;

        foundProduct.reviews.push(review) ;
        await review.save() ;
        await foundProduct.save() ;

        res.redirect(`/products/${id}`) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})

router.get('*', (req, res)=>{
    res.render('error', {err: 'You have choosen wrong path'}) ;
})

module.exports = router ;