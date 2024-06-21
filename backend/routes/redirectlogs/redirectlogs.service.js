const pool = require('../../config/db')
require('dotenv').config()
const moment = require('moment');  
module.exports={
   
        insertRedirectionlogs: (data, callback) => {
    const {msisdn,clickid,reason,currentUrl}=data
            const insertIntoRedirectionLogs = process.env.insertIntoRedirectionLogs
              .replace('<msisdn>', msisdn)
              .replace('<clickid>', clickid)
              .replace('<reason>', reason)
              .replace('<url>', currentUrl)
           
            console.log("insertIntoRedirectionLogs ", insertIntoRedirectionLogs);
        
            pool.query(`${insertIntoRedirectionLogs}`, [], (err, result) => {
        
              if (err) return callback(err);
              else return callback("", "Success");
            });
          }
        }