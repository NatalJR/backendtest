var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();

// app.use(express.static(__dirname+'/client'))
app.use(bodyParser.json());
// app.use(cors());

AccidentType = require('./models/accidentType');
// console.log(AccidentType.find({ value: '1' }));

// connect to mongoose
mongoose.connect('mongodb://dbadmin:wa602a@localhost:27017/testdb');

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {console.log("CONNECTED");});


app.get('/', (req, res) => {
    res.send('Use /api/whatyouwant for data');
});

app.get('/api/AccidentTypes', cors(), (req, res) => {
    AccidentType.getAccidentTypes((err, accidentTypes)=>{
        if(err){throw(err);}
        // console.log(accidentTypes.length);
        res.status(200).json(accidentTypes);
    })
});

app.post('/api/AccidentTypes', cors(), (req, res) => {
    let accidentType = req.body;
    AccidentType.addAccidentType(accidentType, (err, accidentType)=>{
        if(err){throw(err);}
        // console.log(accidentTypes.length);
        res.status(200).json(accidentType);
    })
});

app.put('/api/AccidentTypes/:_id', cors(), (req, res) => {
    let id = req.params._id
    let accidentType = req.body;
    AccidentType.updateAccidentType(id, accidentType, {}, (err, accidentType)=>{
        if(err){throw(err);}
        // console.log(accidentTypes.length);
        res.status(200).json(accidentType);
    })
});

app.delete('/api/AccidentTypes/:_id', cors(), (req, res) => {
    let id = req.params._id
    AccidentType.deleteAccidentType(id, (err, accidentType)=>{
        if(err){throw(err);}
        // console.log(accidentTypes.length);
        res.status(200).json(accidentType);
    })
});

app.listen(3000);
console.log('Running on port 3000')