const {Notify,charging,userDetails,userDeactivate}=require("./charging.controller")

const router = require("express").Router();


router.post("/", charging);

module.exports = router;