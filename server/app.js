var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    bodyParser = require('body-parser');

var notebookRoutes = require("./routes/notebooks");
var userRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.get('/api/hello', function(req, res) {
  res.json({'message': 'Hello World'});
})

app.use('/api/notebooks', notebookRoutes);
app.use('/api/users', userRoutes);

app.listen(8000, function(){
    console.log("APP IS RUNNING ON PORT 8000");
})
