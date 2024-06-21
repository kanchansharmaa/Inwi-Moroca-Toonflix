const pool = require('../../config/db')
require('dotenv').config()
const moment = require('moment');  
module.exports={
   
        insertCallback: (data, callback) => {
            //  console.log("data in service", data)
        
            const {
                action,
                chargingstatus,
                msisdn,
                chargedAmount,
                transactiondID,
                message,
                serviceId,
                operator
            } = data;
        
        
            const insertCallbackLogs = process.env.insertCallbackLogs
              .replace('<msisdn>', msisdn)
              .replace('<action>', action)
              .replace('<chargingStatus>', chargingstatus)
              .replace('<Transactionid>', transactiondID)
              .replace('<message>', message)
              .replace('<amount>', chargedAmount)
              .replace('<serviceId>', serviceId)
              .replace('<operator>', operator);
       
            console.log("insertCallbackLogs ", insertCallbackLogs);
        
            pool.query(`${insertCallbackLogs}`, [], (err, result) => {
        
              if (err) return callback(err);
              else return callback("", "Success");
            });
          },

        //    insertIntoSubscription : (data, callback) => {
        //     // console.log("data in service", data)
        
        //     const {
        //         action,
        //         chargingstatus,
        //         msisdn,
        //         chargedAmount,
        //         transactiondID,
        //         message,
        //         serviceId,
        //         operator
        //     } = data;
        
        //     const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');  // Current date and time
        //     console.log("currentDate", currentDateTime);
        
        //     // Creating next valid date by adding one day to the current date
        //     const nextValidDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        //     console.log("nextValidDate", nextValidDate);
        
        //     const insertIntoSubscriptionSuccess = process.env.insertIntoSubscriptionSuccess
        //         .replace('<msisdn>',msisdn)
        //         .replace('<action>',action)
        //         .replace('<chargingStatus>', chargingstatus)
        //         .replace('<Transactionid>', transactiondID)
        //         .replace('<message>', message)
        //         .replace('<amount>', chargedAmount)
        //         .replace('<serviceId>', serviceId)
        //         .replace('<operator>', operator)
        //         .replace('<subdatetime>', currentDateTime)
        //         .replace('<lastbiled_date>',currentDateTime)
        //         .replace('<nextbilled_date>', nextValidDate)
        //         .replace('<type_event>','SUB');
        
        //     console.log("insertIntoSubscriptionSuccess SQL: ", insertIntoSubscriptionSuccess);
        
        //     pool.query(insertIntoSubscriptionSuccess, [], (err, result) => {
        //         if (err) return callback(err);
        //         else return callback(null, "Success");
        //     });
        // },

         insertIntoSubscription : (data, callback) => {
          // Extract data fields
          const {
              action,
              chargingstatus,
              msisdn,
              chargedAmount,
              transactiondID,
              message,
              serviceId,
              operator
          } = data;
      
          const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');  // Current date and time
          const nextValidDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');  // Next valid date
      
          // First SQL for Subscription Success
          const insertIntoSubscriptionSuccess = process.env.insertIntoSubscriptionSuccess
              .replace('<msisdn>', msisdn)
              .replace('<action>', action)
              .replace('<chargingStatus>', chargingstatus)
              .replace('<Transactionid>', transactiondID)
              .replace('<message>', message)
              .replace('<amount>', chargedAmount)
              .replace('<serviceId>', serviceId)
              .replace('<operator>', operator)
              .replace('<subdatetime>', currentDateTime)
              .replace('<lastbiled_date>', currentDateTime)
              .replace('<nextbilled_date>', nextValidDate)
              .replace('<type_event>', 'SUB');
      
          console.log("insertIntoSubscriptionSuccess SQL: ", insertIntoSubscriptionSuccess);
      
          // Execute the first query
          pool.query(insertIntoSubscriptionSuccess, [], (err, result) => {
              if (err) {
                  return callback(err);
              }
              
              else
               {
                  // Define the SQL for Billing Success if the first query succeeds
                  const insertIntoBillingSuccess = process.env.insertIntoBillingSuccess
                      .replace('<msisdn>', msisdn)
                      .replace('<serviceId>', serviceId)
                      .replace('<amount>', chargedAmount)
                      .replace('<biling_datetime>', currentDateTime)
                      .replace('<nextbilled_date>', nextValidDate)
                      .replace('<type_event>', 'SUB')
                      .replace('<action>', action)
                      .replace('<chargingStatus>', chargingstatus)
                      .replace('<operator>', operator)
                      .replace('<message>', message)
                      .replace('<Transactionid>',transactiondID);

      
                  console.log("insertIntoBillingSuccess: ", insertIntoBillingSuccess);
      
                  // Execute the second query
                  pool.query(insertIntoBillingSuccess, [], (err, billingResult) => {
                      if (err) return callback(err);
                      else return callback(null, "Success");
                  });
              }

          });
      },


    updateSubscription : (data, callback) => {
        let {
            action,
            chargingstatus,
            msisdn,
            chargedAmount,
            transactiondID,
            message,
            serviceId,
            operator
        } = data;
    
        let type_event='REN'

       

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("Current Date:", currentDateTime);
    
        const nextValidDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Valid Date:", nextValidDate);
    
        const insertIntoBillingSuccess = process.env.insertIntoBillingSuccess
            .replace('<msisdn>', msisdn)
            .replace('<action>', action)
            .replace('<chargingStatus>', chargingstatus)
            .replace('<Transactionid>', transactiondID)
            .replace('<message>', message)
            .replace('<amount>', chargedAmount)
            .replace('<serviceId>', serviceId)
            .replace('<operator>', operator)
            .replace('<biling_datetime>', currentDateTime)
            .replace('<nextbilled_date>', nextValidDate)
            .replace('<type_event>', type_event);
    
        console.log("Billing Insert SQL:", insertIntoBillingSuccess);
    
        pool.query(insertIntoBillingSuccess, [], (err, result) => {
            if (err) {
                console.error('Error inserting into billing:', err);
                return callback(err);
            }
    
            // Use process.env.updateTblSubscription for updating tbl_subscription
            const updateSubscriptionQuery = process.env.updateTblSubscription
                .replace('<msisdn>', msisdn)
                .replace('<action>', action)
                .replace('<chargingStatus>', chargingstatus)
                .replace('<message>', message)
                .replace('<lastbiled_date>', currentDateTime)
                .replace('<nextbilled_date>', nextValidDate)
                .replace('<type_event>', type_event);
    
            console.log("Subscription Update SQL:", updateSubscriptionQuery);
    
            pool.query(updateSubscriptionQuery, [], (err, updateResult) => {
                if (err) {
                    console.error('Error updating subscription:', err);
                    return callback(err);
                }
                console.log("Updated subscription for MSISDN:", msisdn);
                return callback(null, "Success");
            });
        });
    },

    deleteSubscription: (data, callback) => {
        // console.log("unsub data\n", data)
        const {
            action,
            msisdn,
            message,
           
        } = data;
    
        // console.log("env query for unsub", process.env.insertIntoTblUnsub);
    
        const insertIntoTblUnsub = process.env.insertIntoTblUnsub
          .replace('<msisdn>', msisdn)
          .replace('<type_event>', 'UNSUB')
          .replace('<action>', action)
          .replace('<message>', message)
      
    
        // console.log("insertIntoTblUnsub", insertIntoTblUnsub);
    
        // Insert into tbl_subscription_unsub
        pool.query(insertIntoTblUnsub, [], (err, insertResult) => {
          if (err) {
            console.error("Error inserting into tbl_subscription_unsub", err);
            return callback(err);
          }
    
    
    
          const deleteSubQuery = process.env.deletefromSubscription.replace('<msisdn>', msisdn);
    
    
          pool.query(deleteSubQuery, [], (err, deleteResult) => {
            if (err) {
              console.error("Error deleting from tbl_subscription", err);
              return callback(err);
            }
    
            return callback(null, "Success in unsubscribing");
          });
        });
      },

      insertIntoOnlySubscription: (data, callback) => {
        //  console.log("data in service", data)
    
        const {
            action,
            chargingstatus,
            msisdn,
            chargedAmount,
            transactiondID,
            message,
            serviceId,
            operator
        } = data;
    
        
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("Current Date:", currentDateTime);
    
        const nextValidDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Valid Date:", nextValidDate);
    
        const insertIntoSubscriptionSuccess = process.env.insertOnlySubscription
              .replace('<msisdn>', msisdn)
              .replace('<action>', action)
              .replace('<chargingStatus>', chargingstatus)
              .replace('<Transactionid>', transactiondID)
              .replace('<message>', message)
              .replace('<amount>', chargedAmount)
              .replace('<serviceId>', serviceId)
              .replace('<operator>', operator)
              .replace('<subdatetime>', currentDateTime)
              .replace('<nextbilled_date>', nextValidDate)
              .replace('<type_event>', 'SUB');

              console.log("insertIntoSubscriptionSuccess SQL: ", insertIntoSubscriptionSuccess);
    
        pool.query(`${insertIntoSubscriptionSuccess}`, [], (err, result) => {
    
          if (err) return callback(err);
          else return callback("", "Success");
        });
      },

      insertIntoBillingFailed: (data, callback) => {
        //  console.log("data in service", data)
    
        const {
            action,
            chargingstatus,
            msisdn,
            chargedAmount,
            transactiondID,
            message,
         
        } = data;
    
    
        const insertIntoBillingFailed = process.env.insertIntoBillingFailed
              .replace('<msisdn>', msisdn)
              .replace('<action>', action)
              .replace('<chargingStatus>', chargingstatus)
              .replace('<Transactionid>', transactiondID)
              .replace('<message>', message)
              .replace('<amount>', chargedAmount)
              console.log("insertIntoBillingFailed SQL: ", insertIntoBillingFailed);
    
        pool.query(`${insertIntoBillingFailed}`, [], (err, result) => {
    
          if (err) return callback(err);
          else return callback("", "Success");
        });
      },
      insertIntoSub: (data, callback) => {
        const {
            action,
            chargingstatus,
            msisdn,
            chargedAmount,
            transactiondID,
            message,
            serviceId,
            operator
        } = data;
    
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("Current Date:", currentDateTime);
    
        const nextValidDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Valid Date:", nextValidDate);
    
        // First check if the msisdn is already in the tbl_subscription
        // const checkMsisdnQuery = 'SELECT msisdn FROM tbl_subscription WHERE msisdn = $1';

        const checkMsisdnQuery = process.env.checkuser
        .replace('<msisdn>', msisdn)

        pool.query(`${checkMsisdnQuery}`,[],(err, result) => {
            if (err) {
                console.error("Database error when checking msisdn:", err);
                return callback(err);
            }
               console.log("result",result)
            // If msisdn does not exist, proceed to insert
            if (result.length=== 0) {
                const insertQuery = process.env.insertOnlySubscription
                    .replace('<msisdn>', msisdn)
                    .replace('<action>', action)
                    .replace('<chargingStatus>', chargingstatus)
                    .replace('<Transactionid>', transactiondID)
                    .replace('<message>', message)
                    .replace('<amount>', chargedAmount)
                    .replace('<serviceId>', serviceId)
                    .replace('<operator>', operator)
                    .replace('<subdatetime>', currentDateTime)
                    .replace('<nextbilled_date>', nextValidDate)
                    .replace('<type_event>', 'SUB');
    
                console.log("Insert SQL:", insertQuery);
    
                pool.query(insertQuery, [], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Insert error:", insertErr);
                        return callback(insertErr);
                    }
                    callback(null, "Success");
                });
            } else {
                console.log("msisdn already exists in the database.");
                callback(null, "msisdn already exists.");
            }
        });
    }
    

   

    
    
}