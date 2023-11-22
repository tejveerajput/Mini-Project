const express= require('express') ;
const app = express() ;
const path = require('path') ;
const mongoose = require('mongoose') ;
const productRoutes = require('./routes/productRoutes') ;
const reviewRoutes = require('./routes/reviewRoutes')
const EjsMate = require('ejs-mate') ;
const methodOverride = require('method-override') ;

const seed = require('./seed') ;
const seedDB = require('./seed') ;


app.engine('ejs', EjsMate) ;
app.set('view engine', 'ejs') ;
app.set('views', path.join(__dirname, 'views')) ;

app.use(express.static(path.join(__dirname, 'public'))) ;
app.use(express.urlencoded({extended: true})) ;
app.use(methodOverride('_method')) ;

mongoose.connect('mongodb://127.0.0.1:27017/shopping')
.then(()=>{
    console.log('DB connected') ;
})
.catch(()=>{
    console.log('Something went Wrong') ;
})

// seeding Database
// seedDB() ;

app.use(productRoutes)
app.use(reviewRoutes) ;

app.listen(3000, ()=>{
    console.log('port 3000') ;
})