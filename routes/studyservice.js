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
 * Get study by id
 * @route GET /study/{id}
 * @group Study - All operations about studies
 * @returns {object} 200 - An array of studies info
 * @returns {Error}  500 - Internal error
 */

router.get('/:id',function(req,res){
    if(req.params.id){
        Study.findById(req.params.id).then(result =>{
            res.status(200);
            res.json(result);
        })
        .catch(err=>{
            res.status(500);
            res.send("Error: " + err.message);
        });
    } else{
        res.status(400);
        res.send("Error: Invalid id");
    }
});
/**
 * Create new study
 * @route POST /study/
 * @group Study - All operations about studies
 * @returns  200 - Successfully inserted
 * @returns {Error}  500 - Internal error
 */
router.post('/',function(req,res){
    console.log(req.body.researchers);
    //var listResearchers = JSON.stringify(req.body.researchers);
    //console.log(listResearchers);
    // var listResearchers = [{name: "T"},{name: "A"}];
    // //res.send(JSON.stringify(listResearchers));
    Study.create({name: req.body.name, description: req.body.description, researchers: req.body.researchers}).then(rs =>{
        console.log(rs);
        res.status(200);
        res.send("Study created " + JSON.stringify(req.body.researchers));
    }).catch(err=>{
        console.log(err);
        res.status(500);
        res.send("Error: " + err.message);
    });
});
/**
 * Update new study
 * @route PUT /study/{id}
 * @param {Integer} id - The id of the study 
 * @group Study - All operations about studies
 * @returns  200 - Successfully updated
 * @returns {Error}  500 - Internal error
 */
router.put('/:id', function(req, res){
    if(req.params.id){
        
        Study.findById(req.params.id).then(study =>{
            if(study.researchers)
            {
                study.researchers.remove();
            }
                study.researchers = req.body.researchers;
                study.name = req.body.name;
                study.description = req.body.description;
                Study.updateOne(study).then(rs=>{
                    res.status(200);
                    res.send("Updated")
                }).catch(err => {
                    res.status(500);
                    res.send("Error: " + err.message);
                });
        }).catch(err=>{
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
 * @returns  200 - Successfully deleted
 * @returns {Error}  500 - Internal error
 */
router.delete('/:id',function(req,res){
    if(req.params.id){
        Study.findByIdAndRemove(req.params.id)
        .then(rs =>{
            res.status(200);
            res.send("Deleted")
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