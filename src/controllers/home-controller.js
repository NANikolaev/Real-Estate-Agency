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

router.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post((req,res)=>{
    homeService.login(req,res)
    .then(token=>{
        res.cookie('accessToken',token)
        res.redirect('/')
    })
    
})

router.get('/logout',(req,res)=>{
    res.clearCookie('accessToken')
    res.redirect('/')
})

module.exports=router