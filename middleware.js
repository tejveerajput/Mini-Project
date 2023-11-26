const {productSchema , reviewSchema} = require('./schema')


const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc})
    if(error){
        return res.render('error', {err: ''});
    }
    next();
}

const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        return res.render('error', {err: ''});
    }
    next();
}

const isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Please Log In First') ;
        return res.redirect('/login') ;
    }
    next() ;
}


module.exports = {isLoggedIn, validateReview , validateProduct}
