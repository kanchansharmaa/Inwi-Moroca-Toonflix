const {callbacknotify}=require("./callback.controller")

const router = require("express").Router();


router.post("/", callbacknotify);

module.exports = router;