var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/',function(req,res){
    console.log("Api study");
    res.status("200");
    res.send("api/study invoked");
});
module.exports = router;