var mongoose = require('mongoose');

var researcherSchema = mongoose.Schema({
    name: String
});
var Researcher = mongoose.model("reseacher",researcherSchema,"researcher");
module.exports = {ResearcherModel:Researcher};
module.exports = {ResearcherSchema:researcherSchema};