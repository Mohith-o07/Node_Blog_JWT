const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const Schema=mongoose.Schema;
const blogschema=new Schema({
    bloguser:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});

blogschema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(); //genSaltSync();
    this.bloguser=bcrypt.hashSync(this.bloguser,salt);
    next();
})

const Blog=mongoose.model('Blogg',blogschema);
module.exports=Blog;