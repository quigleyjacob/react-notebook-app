// 100% disclosure, the overall setup for the backend of this app was
// inspired by The Advanced Web Developers Bootcamp on Udemy. The code
// for this particular project can be found here: https://ide.c9.io/learnwithcolt/wdb-part2

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// I have four routes to connect to each of the data types that I keep in the database
// and then each route is aided by a helper file that contains all the methods I use to
// peform back end work
var notebookRoutes = require("./routes/notebooks");
var userRoutes = require('./routes/users');
var noteRoutes = require('./routes/notes');
var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

app.use('/api/notebooks', notebookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/todos', todoRoutes);

app.listen(8000, function(){
    console.log("APP IS RUNNING ON PORT 8000");
})
