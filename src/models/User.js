const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

let userSchema=new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     username:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     }
})

userSchema.pre('save',function(next){
    this.name=this.name.trim();
    this.username=this.username.trim();
    next()
})
userSchema.pre('save',function(next){
        bcrypt.hash(this.password,8)
        .then(pass=>{
            this.password=pass
            next()
        })
})

let User=mongoose.model('User',userSchema)
module.exports=User