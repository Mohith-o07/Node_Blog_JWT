const mongoose=require('mongoose');
const { isEmail }=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'minimum password length is 6 characters']
    }
});

//fire a function after a doc saved to db..
userSchema.post('save',(doc,next)=>{
    console.log('A new user has been created and saved\n',doc);
    next();//needed to process to the next step in mongoose middleware and hooks..
})

//fire a function before a doc was saved to db..
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(); //genSaltSync();
    this.password=bcrypt.hashSync(this.password,salt);
    next();
})

//static method to login user..
userSchema.statics.login=async function(email,password){
    const user=await this.findOne({ email });
    if(user){
        if(password.length<6){
            throw Error('minimum password length is 6 characters');
        }
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
            throw Error('incorrect password');
    }
    throw Error('incorrect email');
 };

const User=mongoose.model('user',userSchema);

module.exports=User;