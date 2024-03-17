const express=require('express');  //returns a func..
const morgan=require('morgan');
const mongoose=require('mongoose');
const methodOverride = require('method-override');
const app=express();  //invokes an express app..

const blogRoutes=require('./routes/blogRoutes');
//connect to mongoDB..
const dbURI='mongodb+srv://mohith:KrIs786@cluster0.epmtaho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
.then(res=>{
    app.listen(3000);
    console.log('connected to db!');
})
.catch(err=>console.log(err))
//register view engine..
app.set('view engine','ejs');

//middleware & static files..
app.use(express.static('styles'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
// After initializing your Express app
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    
    //res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/v1/blogs');
});

app.get('/v1/blogs/about',(req,res)=>{
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',{title:"about"});
});

//blog routes..
app.use('/v1/blogs',blogRoutes);

app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:"error"});
})
