var express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');



var app = express();
app.listen(100);
app.use(express.static('public'));

app .use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection
({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'emp'
});

//connection.connect(function (err)
//{
  //  if (err)
    //{
      //  throw err;
    //}
    //console.log("Your are connected to database.");
//})
connection.connect((err) =>
{
    if(!err)
    console.log('Database is not connected.');
    else
    console.log('You are connected to database.');
});


app.get('/', function(req,res)
{
    res.sendFile(__dirname+"/public/employee.html");
});

app.get('/getEmployee', function(req,res)
{
    var empid = req.query.empid;
    var sql = "SELECT * FROM employee WHERE empid = ?";
    connection.query(sql,[empid], function (err,result)
    {
        if(err) 
            throw err;
        else 
            res.send(JSON.stringify(result));
    })

});

//Get update

app.get('/updateEmployee', function(req,res)
{
    var empid = req.query.empid;
    var empname = req.query.empname;
    var empsalary = req.query.empsalary;


    var sql = "UPDATE employee SET empid = ?, empName = ?, empSalary = ?";
    connection.query(sql,[empid,empname,empsalary], function (err,result)
    {
        if(err) 
            throw err;
        else 
            res.send(JSON.stringify(result));
    })

});