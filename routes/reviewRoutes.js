const express = require('express') ;
const router = express.Router() ;
const Product = require('../models/Product');
const Review = require('../models/Review');

router.post('/products/:id/review', async (req, res)=>{
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
        res.render('error') ;
    }
})

module.exports = router ;