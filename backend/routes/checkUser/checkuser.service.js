

const pool = require('../../config/db')
require('dotenv').config()

module.exports = {
  
    checkuserexists: (msisdn, callback) => {
        const checkActiveUser = process.env.checkuserexists
          .replace("<msisdn>", msisdn)
        
      
        pool.query(`${checkActiveUser}`, [], (err, result) => {
          if (err) return callback(err);
    
          return callback("", result);
        });
      },
}