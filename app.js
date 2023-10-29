const express=require('express');  //returns a func..
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();  //invokes an express app..

const blogRoutes=require('./routes/blogRoutes');
//connect to mongoDB..
const dbURI='mongodb+srv://username:password@test.epmtaho.mongodb.net/?retryWrites=true&w=majority';
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


app.get('/',(req,res)=>{
    
    //res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',{title:"about"});
});

//blog routes..
app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:"error"});
})
