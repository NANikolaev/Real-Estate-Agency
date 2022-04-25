const router=require('express').Router();
const estateService=require('../services/estate-service');

router.get('/houses-for-rent',(req,res)=>{
      estateService.getAll(req,res)
       .then(house=>{res.render('aprt-for-recent',{house})})
})

router.route('/create-offer')
.get((req,res)=>{
    res.render('create')
})
.post((req,res,next)=>{
    estateService.create(req,res)
    .then(house=>res.redirect('/houses-for-rent'))
    .catch(err=>next(err))
})

router.get('/details/:id',(req,res)=>{
      estateService.details(req,res)
     .then(house=>res.render('details',{house}))
})

router.route('/edit/:id')
.get((req,res)=>{
     estateService.getOne(req,res)
     .then(house=>{res.render('edit',{house})})
})
.post((req,res)=>{
    estateService.edit(req,res)
    .then(house=>{res.redirect(`/details/${house._id}`)})
})

router.get('/rent/:id',(req,res)=>{
    estateService.rent(req,res)
    .then(house=>res.redirect(`/details/${house._id}`))
})
router.get('/delete/:id',(req,res)=>{
     estateService.removeHouse(req,res)
     .then(house=>res.redirect('houses-for-rent'))
})

module.exports=router