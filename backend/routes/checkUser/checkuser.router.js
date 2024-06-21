const {checkuservalidity}=require("./checkuser.controller")

const router = require("express").Router();


router.get("/", checkuservalidity);

module.exports = router;