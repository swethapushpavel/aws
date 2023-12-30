var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Product');
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

app.post('/blooddonar', function (req, res) {
  var Name1 = req.body.fname;
  var name2=req.body.lname;
  var Email = req.body.email;
  var phone = req.body.phone;
  var group = req.body.group;
  var date = req.body.date;
  var Address = req.body.add;
  var hiv=req.body.hiv;
  var age=req.body.age;
  var data = {
    "fname": Name1,
    "lname": name2,
    "email": Email,
    "phone": phone,
    "group":group,
    "date":date,
    "add": Address,
    "hiv":hiv,
    "age":age,
  
  }
  db.collection('details').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
    
  });
  return res.redirect("success.html");
})
app.listen(7000, function () {
  
  console.log("server listening at port 7000");
});