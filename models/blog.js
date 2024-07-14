const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const blogschema=new Schema({
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

const Blog=mongoose.model('Bloge',blogschema);
module.exports=Blog;