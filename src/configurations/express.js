const express=require('express');
const handlebars=require('express-handlebars');
const cookieParser=require('cookie-parser')


module.exports=(server)=>{
    server.use(express.static('./src/static'));
    server.use(express.urlencoded());
    server.use(cookieParser())
    server.engine('hbs',handlebars.create({extname:'hbs'}).engine)
    server.set('view engine','hbs')
    server.set('views','./src/views');   
}