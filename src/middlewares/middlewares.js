const jwt=require('jsonwebtoken');
const secret=require('../configurations/secret');

function ifUser(req,res,next){
    if(req.cookies['accessToken']){
        let token=req.cookies['accessToken']
        let user=jwt.verify(token,secret)
        req.user=user;
        res.locals.user=true
    }
    next()
}

module.exports=(server)=>{
    server.use(ifUser)
}