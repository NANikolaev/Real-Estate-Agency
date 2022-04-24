const mongoose=require('mongoose');
const User=require('./User');

const estateSchema=new mongoose.Schema({
     name:{
         type:String,
         required:[true,"Name is required"],
         minlength:[6,"Name should be at least 6 characters long."]
     },
     type:{
        type:String,
        required:[true,"Type is required"],
     },
     year:{
        type:Number,
        required:[true,"Type is required"],
        min:[1850,"Building shouldnt be under 1850 year."],
        max:[2022,"Unexisting building."]
     },
     city:{
        type:String,
        required:[true,"City is required"],
        minlength:[4,"City name should be at least 5 characters long."]
     },
     image:{
        type:String,
        required:[true,"House image is required"],
        validate:[/^[http?s:\/\/]+/,'Invalid Url adress']
     },
     description:{
        type:String,
        required:[true,"Description is required"],
        maxlength:[60,'Description should be maximum of 60 characters long.']
     },
     pieces:{
        type:Number,
        required:[true,"Available pieces is required"],
        min:[0,'Pieces cant be minus'],
        max:[10,'Max Pieces 10']
     },
     rentedUsers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
     owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}

})

let Estate=mongoose.model("Estate",estateSchema);

module.exports=Estate