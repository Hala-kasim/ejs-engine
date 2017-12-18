var express = require("express");
var todoController = require('./controllers/todoController');

var app = express();


app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);//call the function from here.

app.listen(3000);
console.log('listen to port 3000');
