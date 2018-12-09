//////  引入模块  ///////
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session")
/////  引入路由器  /////
const user = require("./routes/user")
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
    Origin:["http://127.0.0.1:8080","http://localhost:8080"],
    //允许session
    credentials:true
}));
app.use(session({
    secret:"128位随机字符",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

///////托管静态资源  ///////
app.use(express.static("../public"))

////挂载路由
app.use("/user",user)