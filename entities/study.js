var mongoose = require('mongoose');

var studySchema = mongoose.Schema({
    name: String,
    description: String
});
var Study = mongoose.model("study",studySchema,"study");
module.exports = Study;