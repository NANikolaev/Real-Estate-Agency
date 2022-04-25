const router = require('express').Router();
const homeService = require('../services/home-service');


router.get('/', (req, res) => {
    homeService.last3()
        .then(house => res.render('home', { house }))
})

router.route('/register')
    .get((req, res) => {
        res.render('register')
    })
    .post((req, res, next) => {
        homeService.register(req, res)
            .then(token => {
                res.cookie('accessToken', token)
                res.redirect('/')
            })
            .catch(err => next(err))
    })

router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res, next) => {
        homeService.login(req, res)
            .then(token => {
                res.cookie('accessToken', token)
                res.redirect('/')
            })
            .catch(err => next(err))

    })

router.get('/logout', (req, res) => {
    res.clearCookie('accessToken')
    res.redirect('/')
})

router.route('/search')
.get((req,res)=>{
    res.render('search')
})
.post((req,res)=>{
    homeService.search(req,res)
    .then(match=>res.render('search',{match}))
})


module.exports = router