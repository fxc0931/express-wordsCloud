const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");



const app = express();
// user.js
const users = require("./routers/api/user");
const words = require("./routers/api/words");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// DB config
const db = require("./config/keys").mongoURI

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db)
    .then(() => {
        console.log('successful')})
    .catch(err => console.log(err))

app.get("/",(req,res) => {
    res.send("first blood");
})

// use routes
app.use("/api/users", users);
app.use("/api/words", words);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running on port ${port}');
})

