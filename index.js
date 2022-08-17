const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json())//is use for taking data into json format
app.use(express.static('public'))// send static html page
app.use(bodyParser.urlencoded({extended: true})) //convert into html format
mongoose.connect('mongodb://0.0.0.0:27017/mynewdb',{useNewUrlParser:true,useUnifiedTopology:true}); // connect to MongoDB database server
var db = mongoose.connection;// establish connection to MongoDB
db.on('error',()=>{console.log('Error in database connection');});
db.once('open',()=>{console.log('database is open for once');});
app.post('/save',(req, res)=>{
    var uname = req.body.uname;
	var lname = req.body.lname;
	var eid = req.body.eid;
    var emid = req.body.emid;
	var addr = req.body.addr;
	var dob = req.body.dob;
	var pin= req.body.pin;
    var password = req.body.password;


	var data = {
    'Name': uname,
	'Last Name': lname,
	'Email id':eid,
	'Address': addr,
	'Date of Birth':dob,
	'Pin Code':pin,
    'Password':password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err) throw err;
        console.log('successfully insert data');
    });
    return res.sendFile(__dirname+'/Bizgurukul.html')//redirect to success page
})
app.get('/',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/Reg_Form.html')
}).listen(3000);
console.log('Starting server on 3000 port');