const router=require('express').Router();
const homeService=require('../services/home-service');


router.get('/',(req,res)=>{
     res.render('home',)
})

router.route('/register')
.get((req,res)=>{
    res.render('register')
})
.post((req,res)=>{
   homeService.register(req,res)
      .then(token=>{
          res.cookie('accessToken',token)
          res.redirect('/')
      })
})



module.exports=router