var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// /**
//  * Get list of studies
//  * @route GET /api/study
//  * @group Study - All operations about studies
//  * @returns {object} 200 - An array of studies info
//  * @returns {Error}  default - Unexpected error
//  */
// router.get('/',function(req,res){
//     console.log("Api study");
//     res.status("200");
//     res.send("api/study invoked");
// });
// module.exports = router;