
const express=require('express');  //returns a func..
const morgan=require('morgan');
const cookieParser=require('cookie-parser');//middleware
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();  //invokes an express app..
const blogRoutes=require('./routes/blogRoutes');
const authRoutes=require('./routes/authRoutes');
const {rateLimitMiddleware}=require('./middleware/ratelimiting');
const {requireAuth,checkUser}=require('./middleware/authMiddleware');
//connect to mongoDB..
const dbURI=process.env.dbURI;
const port=process.env.PORT || 3000;
mongoose.connect(dbURI)
.then(res=>{
    app.listen(port);
    console.log('connected to dbb!');
})
.catch(err=>console.log(err))
//register view engine..
app.set('view engine','ejs');
//middleware & static files..
app.use(express.json());
app.use(express.static('styles'));
app.use(express.urlencoded({extended:true}));
//app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cookieParser());
// After initializing your Express app
app.get('*',rateLimitMiddleware);  //implements rate limiting for every route..
app.get('*',checkUser,requireAuth); //applies to every get request..
app.post('*',requireAuth);
app.put('*',requireAuth);
app.delete('*',requireAuth);
app.get('/',(req,res)=>{
    res.redirect('/v1/blogs/');
});

app.use('/v1/blogs',blogRoutes);
app.use('/v1/auth/blogs',authRoutes);
app.use((req,res)=>{
    res.status(404).render('blogs/404',{title:"error"});
})
