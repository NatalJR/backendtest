var mongoose = require ('mongoose');

var accidentTypeSchema = mongoose.Schema({
    value:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var AccidentType = module.exports = mongoose.model('AccidentType', accidentTypeSchema);

//get types
module.exports.getAccidentTypes = (callback, limit)=>{
    AccidentType.find(callback).limit(limit);
}

//add type
module.exports.addAccidentType = (accidentType, callback)=>{
    AccidentType.create(accidentType, callback);
}

//update type
module.exports.updateAccidentType = (id, accidentType, options, callback)=>{
    let query = {_id:id};
    let update = {value:accidentType.value}
    AccidentType.findOneAndUpdate(query, update, options, callback);
}

//delete type
module.exports.deleteAccidentType = (id, callback)=>{
    let query = {_id:id};
    AccidentType.remove(query, callback);
}