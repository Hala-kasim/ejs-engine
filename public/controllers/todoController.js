var bodyParser = require("body-parser");

// var data = [{item:"playing"}, {item:"make food"}, {item:"shopping"}];

var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app) {//we will call this function from app.js file.



app.get('/car', function(req, res) {
    res.render('car', {todos: data});
});

app.post('/car', urlencodedParser, function(req, res) {
    data.push(req.body)
    res.json(data);
});

app.delete('/car/:item', function(req, res) {
    data = data.filter(function(todo) {
        return todo.item.replace(/ /g, '-') !== req.params.item;
    })
    res.json(data);
});



};

/////////////////////////
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import axios from 'axios';
const app = express()

// STATIC SERVER PUBLIC FOLDER
app.use(express.static('./public')) // STATIC

const car_file = fs.readFileSync('./cars.json', 'utf8') || '[]';

let cars = JSON.parse(car_file);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// GET /car
app.get('/car', function (req, res) {
    res.send(cars)
})

// GET /car/<index>
app.get('/car/:index', function (req, res) {
    if (cars[req.params.index]) {
        res.send(cars[req.params.index])
    } else {
        res.status(404).send('car not found');
    }
})

// POST /car
app.post('/car', function (req, res) {
    console.log(req.body);
    cars.push(req.body);
    // TODO: promisify this
    fs.writeFile('./cars.json', JSON.stringify(cars), (err) => {
        if (err) {
            res.status(500).send('Server Error', err);
        } else {
            res.send(cars)
        }
    })
})


const listener = app.listen(process.env.PORT || 3000, function () {
 console.log(`Example app listening on port ${listener.address().port}!`)
});
