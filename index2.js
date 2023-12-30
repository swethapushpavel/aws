var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blood');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection succeeded");
})

var app = express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/finddonar', function (req, res) {
  var Name1 = req.body.pfname;
  var name2=req.body.plname;
  var Email = req.body.email;
  var phone = req.body.phone;
  var group = req.body.group;
  var date = req.body.date;
  var Address = req.body.add;
  var hiv=req.body.hiv;
  var age=req.body.age;
  var bag=req.body.bag;
  var data = {
    "pfname": Name1,
    "plname": name2,
    "email": Email,
    "phone": phone,
    "group":group,
    "date":date,
    "add": Address,
    "hiv":hiv,
    "age":age,
    "bag":bag,
    
  }
  db.collection('donar').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
   return res.redirect("success.html");
})
app.listen(8000, function () {
  
  console.log("server listening at port 8000");
});