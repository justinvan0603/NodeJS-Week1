var mongoose = require('mongoose');
var Researcher = require('./researcher');
var studySchema = mongoose.Schema({
    name: String,
    description: String,
    researchers : [Researcher.ResearcherSchema]
});
var Study = mongoose.model("study",studySchema,"study");
module.exports = Study;