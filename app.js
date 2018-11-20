// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import http from 'http';
// import routes
import todoRoutes from './routes/todo.server.route';
//import scheduler
import schedule from 'node-schedule'
// define our app using express
const app = express();
// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
// set the port
const port = process.env.PORT || 3000;
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern-todo-app', {
    useNewUrlParser: true,
});
// add Source Map Support
SourceMapSupport.install();
app.use('/api', todoRoutes);
app.get('/', (req,res) => {
  return res.sendfile('www/index.html');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
//Set scheduler
var dailyJob = schedule.scheduleJob('0 11 * * *', function() { //0 11 * * *
    //Get names
    var req = {
        host: 'localhost',
        port: '3000',
        path: '/api',
        method: 'GET'
    }
    http.request(req, function(res) {
        res.on('data', function (chunk) {
          var response = JSON.parse(chunk)
          for (var i in response.todos) {
              var post_req = {
                  host: 'localhost',
                  port: '3000',
                  path: '/api/' + response.todos[i].name,
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  } 
              }
              var req_obj = http.request(post_req, function(res) {
                res.on('data', function (chunk) {
                  });
              });
              var bool = (response.todos[i].name === 'Sheza' || response.todos[i].name === 'Sunay') ? false : true;
              req_obj.write('pickUp='+ bool +'&comments=')
              req_obj.end();
          }
        });
      }).end();
});
// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});