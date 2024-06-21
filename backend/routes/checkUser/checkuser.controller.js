const { checkuserexists } = require('./checkuser.service');

module.exports = {
    checkuservalidity: (req, res) => {
        console.log("Received data:", req.query);
        const msisdn = req.query.msisdn;
        if (!msisdn) {
            return res.status(400).send("Missing msisdn parameter.");
        }
        checkuserexists(msisdn, (err, result) => {
            if (err) {
             
                console.error("Error checking user existence:", err);
                return res.status(500).send("Internal server error.");
            }
            console.log("length",result.length)
            if (result.length>0) {
              res.json({status:'1'})
            } 

            
            else {
                // User does not exist, handle accordingly
                 res.json({status:'0'})
            }
        });
    }
};
