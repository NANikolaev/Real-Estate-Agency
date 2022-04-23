let url=require('url');
function errorHandler(err,req,res,next){
       let path=url.parse(req.url).pathname
        if(!err.errors){
            res.cookie('error',[err.message],{maxAge:'1000'})
        }
        else if(err.errors){
            let errors=Array.from(Object.keys(err.errors)).map(k=>err.errors[k].message);
            res.cookie('error',errors,{maxAge:'1000'})
        }
        res.redirect(path)
}

module.exports=(server)=>{
    server.use(errorHandler)
}