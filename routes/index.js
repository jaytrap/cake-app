var express = require('express');
var router = express.Router();
var debug = require('debug');
var path = require('path');
var multer  = require('multer');
var mongoose = require('mongoose');
const { MongoClient } = require('mongodb').MongoClient;
var mongo  = require('mongodb').MongoClient;
var assert  = require('assert');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
// Database Name
const dbName = 'test';
const url = "mongodb://localhost:27017/test";
const storage = multer.diskStorage({
    destination:'./uploads',
    fileName:function(req,file,cb){
        // //cb(Date.now()+path.extname(file.originalname));
        // file.originalname;
}
});
const dataBaseReader = function (req,res) {
    var array = [];
    var array1 = [];
    mongo.connect(url, function(err, client) {
        assert.equal(null,err);
        var con  = client.db(dbName);
        const cursor =  con.collection('soldData').find();
        cursor.forEach(function (doc,err) {
            assert.equal(null,err);
            array1.push(doc);
        }, function () {
            client.close();
            var basicArray = [];
            var deluxArray = [];
            const dataResult = [
                {
                    basic : 0,
                    deluxe: 0,
                    amount:0,
                    date: '2020-02-07T07:49:48.946Z'
                },
                {
                    basic : 0,
                    deluxe: 0,
                    amount:0,
                    date: '2020-02-07T07:49:48.946Z'
                }
            ];

            if(array1.length <1){

            }else {
                for (let x = 0; x < array1.length; x++) {
                    // if (array1[x]['name'] === "Basic") {
                    //     deluxArray.push(array1[x]);
                    // } else if (array1[x]['name'] === "Deluxe") {
                    //     basicArray.push(array1[x]);
                    // }
                    if(dataResult.includes(x => x[0].date == array1[x]['date'])){

                    }
                }
                // array.push(basicArray);
                // array.push(deluxArray);
            }

            res.render('index', {
                title: 'Cake Accounting',
                status:200,
                data:array,
                message:"Some message"
            })
        })
    })
};
const fileReader = file => {
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data)=>{
            if(err) reject('No file was uploaded');
            resolve(data);
        })
    })
};
const fileWriter = (file, data)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err => {
            if(err) reject("Could not write file");
            resolve('success');
        })
    })
}
const uploads = multer({
    storage:storage
}).single('file');
/* GET home page. */
router.get('/', function(req, res, next) {
   dataBaseReader(req,res);
});

router.get('/get-data', function (req, res, next) {

    var array = [];
    var array1 = [];
    mongo.connect(url, function(err, client) {
        assert.equal(null,err);
        var con  = client.db(dbName);
       const cursor =  con.collection('soldData').find();
       cursor.forEach(function (doc,err) {
           assert.equal(null,err);
           array1.push(doc);
       }, function () {
           client.close();
           var basicArray = [];
           var deluxArray = [];
           for(let x = 0; x <= length(array1); x++){
               if(array1[x].name === "Deluxe"){
                   deluxArray.push(array1[x]);
               }else if(array1[x].name === "Basic"){
                   basicArray.push(array1[x]);
               }
           }
           array.push(basicArray);
           array.push(deluxArray);
           res.render('index', {
                                 title: 'Cake Accounting',
                                   status:200,
                                   data:array,
                                   message:"Some message"
                                })
       })
    })
});
router.post('/',  uploads,function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    var array1 = [];
    let obj;
    fileReader(req.file.path).then(data =>{
        var array = data.toString().split("\n");
        var category = parseInt(req.body.category);
        for ( var i =1 ; i < array.length ; i++){
            var date = new Date();
            date.setDate(date.getDate()- parseInt(array.length ) - i);

            let name = "Deluxe";
            if(category === 5){
                name  = "Basic";
            }
            const data1 = {
                "name": name,
                "date": date,
                "amount":  parseInt( array[i]* category),
            };


            array1.push(data1)
        }
        mongo.connect(url,function(err, client) {
            assert.equal(null,err);
            var con  = client.db(dbName);
            con.collection('soldData').insertMany(array1, function (err, results) {
                assert.equal(null,err);
                console.log("inserted array");
                client.close;
            })

        });
        console.log(array1);
        dataBaseReader(req,res);
    });
});

module.exports = router;
