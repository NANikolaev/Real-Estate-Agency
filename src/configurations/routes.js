const homeController=require('../controllers/home-controller');


module.exports=(server)=>{
    server.use(homeController)
}