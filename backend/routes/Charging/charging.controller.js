const { notify } = require("..");
const { } = require("./charging.service");

  
  
  module.exports = {

    charging: (req, res) => {
       
        console.log(req.body,"MOREQUEST------MOREQUEST-----body")
        console.log(req.query,"MOREQUEST------MOREQUEST-----query")
        res.send("Success")
    },

   
  };
  