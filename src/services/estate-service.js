const Estate=require('../models/Estate');

function getAll(req,res){
    return Estate.find().lean()
}

function create(req,res){
    req.body.owner=req.user.find
    return Estate.create(req.body)
}

module.exports={
    getAll,
    create
}