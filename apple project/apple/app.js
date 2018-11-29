//////  引入模块  ///////
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session")
/////  引入路由器  /////

////// 创建服务器 /////
var app = express();
app.listen(8080,()=>{
    console.log("服务器创建成功，端口为：8080");
})

//////使用bodyparser中间件 /////
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors({
    Origin:["http://127.0.0.1:5500","http://localhost:5500"],
    //允许session
    credentials:true
}))
app.use(session({
    secret:"128位随机字符",
    resave:false,
    saveUninitialized:true
}))

///////托管静态资源  ///////
app.use(express.static("../public"))

////挂载路由