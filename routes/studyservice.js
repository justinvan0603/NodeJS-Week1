//include modules needed in this service
var express = require('express');
var mongoose = require('mongoose');
//include express router
var router = express.Router();
//include Study schema
var Study = require('../entities/study');

//Retrieve list of studies
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

router.post('/',function(req,res){
    Study.create({name: req.body.name, description: req.body.description}).then(rs =>{
        console.log(rs);
        res.status(200);
    }).catch(err=>{
        console.log(err);
        res.send("Error: " + err.message);
    });
});

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

