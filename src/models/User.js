const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

let userSchema=new mongoose.Schema({
     name:{
         type:String,
         required:true,
         validate:[/^[A-Za-z]+ [A-Za-z]+$/m,"Invalid format:Expect(First Last)"]
     },
     username:{
        type:String,
        required:true,
        minlength:[5,"Username should be at least 5 characters long"]
     },
     password:{
        type:String,
        required:true,
        minlength:[4,'"Password should be at least 5 characters long"']
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