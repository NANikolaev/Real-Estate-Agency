const Estate=require('../models/Estate');

function getAll(req,res){
    return Estate.find()
}

module.exports={
    getAll
}