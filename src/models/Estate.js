const mongoose=require('mongoose');
const User=require('./User');

const estateSchema=new mongoose.Schema({
     name:{
         type:String,
         required:true,
     },
     type:{
        type:String,
        required:true,
     },
     year:{
        type:Number,
        required:true,
     },
     city:{
        type:String,
        required:true,
     },
     image:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true,
     },
     pieces:{
        type:Number,
        required:true,
     },
     rentedUsers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
     owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}

})

let Estate=mongoose.model("Estate",estateSchema);

module.exports=Estate