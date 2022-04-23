const server=require('express')()
const PORT=3000

require('./src/configurations/database')();






server.listen(PORT,()=>console.log('Server is listening on port',PORT))