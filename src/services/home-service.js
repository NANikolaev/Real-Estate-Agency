const User=require('../models/User');
const secret=require('../configurations/secret');
const jwt=require('jsonwebtoken');

function register(req,res){
   return User.create(req.body)
          .then(user=>{
              let payload={
                  username:user.username,
                  id:user._id
              }
              let accessToken=jwt.sign(payload,secret,{expiresIn:'1d'})
              return accessToken
          })
}

module.exports={
    register
}