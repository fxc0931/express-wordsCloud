const express = require('express');
const router = express.Router();

const Words = require("../../modules/words")

const MongoClient = require('mongodb').MongoClient;

const url = require("./../../config/keys").mongoURI

const jsXlsx = require("xlsx");

var workbook = jsXlsx.readFile('dataSource.xlsm');

var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];

var data = jsXlsx.utils.sheet_to_json(worksheet, {header: "A"})

var item = {}
var dataArr = []
for (let i =0; i < data.length; i++) {
    item = data[i]
    // console.log(item)
    var key;
    var keyArr = []
    for (key in item){
        keyArr.push(item[key])
    }
    dataArr.push(keyArr)
    keyArr = []
}
// console.log(dataArr)


// $route GET api/users/test
// @desc return json data
// @access public
router.get("/words",(req,res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //Find all documents in the customers collection:
        dbo.collection("words").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result[0].dataSource);
            db.close();
        });
    });

})

// $route GET api/users/tegister
// @desc return json data
// @access public
router.post('/words', (req,res)=> {

    const newWords = new Words({
        dataSource: dataArr,
    })

    newWords.save()
        .then( res.json({"msg":"dataSource Created"}))
        .catch(err => console.log(err));




})
module.exports = router;
