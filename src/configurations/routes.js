const homeController=require('../controllers/home-controller');
const estateController=require('../controllers/estate-controller')

module.exports=(server)=>{
    server.use(homeController)
    server.use(estateController)
}