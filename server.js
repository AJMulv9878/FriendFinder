var express = require('express');
var bodyparser = require('body-parser');
path = require ('path');
var serve = require('express-static');

var app = express();
var PORT = process.env.PORT || 3000;

require('./routing/htmlRoutes.js')(app);
require('./routing/apiRoutes.js')(app, bodyparser);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(serve(__dirname + '/public/'));

app.listen(PORT, function(){
    console.log("App listening on port " + PORT);
});
