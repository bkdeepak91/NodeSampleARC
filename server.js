//require dependencies
const express = require('express');
// const passport = require('passport');

//handlers
const controllers = require('./controllers');

//add routes to express app
const routes = require('./routes');

const app = express();

//Error handler
var logger = require('./models/errorLogger');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(passport.initialize());

routes(app, controllers);
const port = process.env.PORT || 4200;
app.listen(port);
console.log('Node Sample API server started on: ' + port);
process.on('uncaughtException', function (err) {
    var error = new Error(err);
    console.log('Caught unhandled exception: ' , error);
    logger.error('Caught unhandled exception: ' , error);
    // process.kill(process.pid, 'SIGTERM');   
});
