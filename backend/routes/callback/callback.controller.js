const { insertCallback, insertIntoSubscription, updateSubscription, deleteSubscription ,insertIntoBillingFailed,insertIntoOnlySubscription,insertIntoSub} = require("./callback.service");

module.exports = {
  callbacknotify: (req, res) => {
    console.log("Received Data:", req.query);

    let data = {
      action: req.query.action,
      chargingstatus: req.query.chargingstatus,
      msisdn: req.query.msisdn,
      chargedAmount: req.query.chargedAmount,
      transactiondID: req.query.transactiondID,
      message: req.query.message,
      serviceId: req.query.serviceId,
      operator: req.query.operator
    };
    
    insertCallback(data, (err, result) => {
      if (err) {
        console.error('Error in insertCallback', err);
        return res.status(500).send('Error');
      }

    
      if (data.action === 'ACT') {
        insertIntoSubscription(data, (err, subResult) => {
          if (err) {
            console.error('Error in insertIntoSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }
      
      else if (data.action === 'RENEW' || data.action === 'RGW' || data.action === 'GW') {
    
        updateSubscription(data, (err, subResult) => {
          if (err) {
            console.error('Error in updateSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }
       else if (data.action === 'DCT') {
      
        deleteSubscription(data, (err, subResult) => {
          if (err) {
            console.error('Error in deleteSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }

      else if (data.action === 'ACTF') {
      
        insertIntoOnlySubscription(data, (err, subResult) => {
          if (err) {
            console.error('Error in deleteSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }

      else if (data.action === 'GRACE' || data.action=='SUSPEND') {
      
        insertIntoBillingFailed(data, (err, subResult) => {
          if (err) {
            console.error('Error in deleteSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }
      else if (data.action === 'ACTP' || data.action=='PARKING') {
      
        insertIntoSub(data, (err, subResult) => {
          if (err) {
            console.error('Error in deleteSubscription', err);
            return res.status(500).send('Error in Subscription');
          }
          res.send('Success');
        });
      }
       else {
        // Handle other actions that do not require changes to subscriptions
        res.send('Invalid action');
      }
    });
  }
};
