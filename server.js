var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();

// app.use(express.static(__dirname+'/client'))
app.use(cors())
app.use(bodyParser.json());

AccidentType = require('./models/accidentType');
// console.log(AccidentType.find({ value: '1' }));

// connect to mongoose
mongoose.connect('mongodb://dbadmin:wa602a@localhost:27017/testdb');

//set db
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {console.log("CONNECTED");});

//routes
app.get('/', (req, res) => {
    res.json({message:'Use /api/whatyouwant for data'});
});

app.get('/api', (req, res) => {
    res.json({message:'Use /api/whatyouwant for data'});
});

//accident types
app.get('/api/AccidentTypes', (req, res) => {
    AccidentType.getAccidentTypes((err, accidentTypes)=>{
        if(err){throw(err);}
        res.json(accidentTypes);
    })
})

app.post('/api/AccidentTypes', (req, res) => {
    let accidentType = req.body;
    AccidentType.addAccidentType(accidentType, (err, accidentType)=>{
        if(err){throw(err);}
        res.status(200).json(accidentType);
    })
})

app.put('/api/AccidentTypes/:_id', (req, res) => {
    let id = req.params._id
    let accidentType = req.body;
    AccidentType.updateAccidentType(id, accidentType, {}, (err, accidentType)=>{
        if(err){throw(err);}
        res.json(accidentType);
    })
})

app.delete('/api/AccidentTypes/:_id', (req, res) => {
    let id = req.params._id
    AccidentType.deleteAccidentType(id, (err, accidentType)=>{
        if(err)throw(err);
        res.json(accidentType);
    })
});

var server = app.listen(process.env.PORT || 3000, () => {
    console.log("App now running on port", server.address().port);
});