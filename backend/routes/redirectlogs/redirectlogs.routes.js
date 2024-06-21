const {getredirectlogs}=require("./redirectlogs.controller")

const router = require("express").Router();


router.post("/", getredirectlogs);

module.exports = router;