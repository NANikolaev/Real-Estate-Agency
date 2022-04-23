const server=require('express')()
const PORT=3000

require('./src/configurations/database')();
require('./src/configurations/express')(server)

server.get('/',(req,res)=>{
    res.render('home')
})



server.listen(PORT,()=>console.log('Server is listening on port',PORT))