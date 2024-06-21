const {insertRedirectionlogs}=require('./redirectlogs.service')

module.exports={
    getredirectlogs:(req,res)=>{

        console.log("data", req.body)
        insertRedirectionlogs(req.body,(err,result)=>{
            if (err) {
                console.error('Error in insertCallback', err);
                return res.status(500).send('Error');
              }
              console.log("result", result)
              res.send(result)
        })
    }
}