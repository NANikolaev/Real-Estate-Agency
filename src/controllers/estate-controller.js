const router=require('express').Router();
const estateService=require('../services/estate-service');

router.get('/houses-for-rent',(req,res)=>{
      estateService.getAll(req,res)
       .then(house=>{res.render('aprt-for-recent',{house})})
})




module.exports=router