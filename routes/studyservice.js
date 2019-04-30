//include modules needed in this service
var express = require('express');
var mongoose = require('mongoose');
//include express router
var router = express.Router();
//include Study schema
var Study = require('../entities/study');

/**
 * Get list of studies
 * @route GET /study/
 * @group Study - All operations about studies
 * @returns {object} 200 - An array of studies info
 * @returns {Error}  default - Unexpected error
 */
router.get('/',function(req,res){
    //Mongoose study collection retreive data
    Study.find({}).exec( function(err,studies){
        //Handle error/ result in callback function
        if(err){
            res.send("Error: " + err.message);
        }
        //produces result in JSON format
        res.json(studies);
    });
});
/**
 * Create new study
 * @route POST /study/
 * @group Study - All operations about studies
 * @returns  200 - Successfully inserted
 * @returns {Error}  default - Unexpected error
 */
router.post('/',function(req,res){
    Study.create({name: req.body.name, description: req.body.description}).then(rs =>{
        console.log(rs);
        res.status(200);
    }).catch(err=>{
        console.log(err);
        res.send("Error: " + err.message);
    });
});
/**
 * Update new study
 * @route PUT /study/{id}
 * @param {Integer} id - The id of the study 
 * @group Study - All operations about studies
 * @returns  200 - Successfully inserted
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', function(req, res){
    if(req.params.id){
        Study.findOneAndUpdate(req.params.id,{name: req.body.name, description: req.body.description}).then(rs=>{
            res.status(200);
        }).catch(err => {
            res.status(500);
            res.send("Error: " + err.message);
        });
    } else{
        res.status(400);
        res.send("Error: Invalid id");
    }
});
/**
 * Delete study by id
 * @route DELETE /study/{id}
 * @param {Integer} id - The id of the study 
 * @group Study - All operations about studies
 * @returns  200 - Successfully inserted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',function(req,res){
    if(req.params.id){
        Study.findByIdAndRemove(req.params.id)
        .then(rs =>{
            res.status(200);
        }).catch(err =>{
            res.status(500);
            res.send("Error: " + err.message);
        });
    } else {
        res.status(400);
        res.message("Error: Invalid id");
    }
}
);

module.exports = router;