const express=require('express');
const handlebars=require('express-handlebars');

module.exports=(server)=>{
    server.use(express.static('./src/static'));
    server.use(express.urlencoded());
    server.engine('hbs',handlebars.create({extname:'hbs'}).engine)
    server.set('view engine','hbs')
    server.set('views','./src/views');   
}