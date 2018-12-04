const express = require("express");
const pool = require("../pool");
const router = express.Router();
/* -----  获取验证码  ------*/
router.get("/idms",(req,res)=>{
    var sql = "SELECT iid,idms_url,idms_codes FROM ap_idms";
    pool.query(sql,[],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,result})
        }else{
            rse.send({code:0,msg:"查询不到信息"})
        }
    })
});

/* -----  注册用户  ------*/
router.post("/register",(req,res)=>{
    var uname = req.body.email,
        upwd = req.body.password,
        country = req.body.country,
        user_lastName = req.body.lastName,
        user_firstName = req.body.firstName,
        birthday = req.body.birthday,
        qs1 = req.body.qs1,
        qs1Answer = req.body.qs1Answer,
        qs2 = req.body.qs2,
        qs2Answer = req.body.qs2Answer,
        qs3 = req.body.qs3,
        qs3Answer = req.body.qs3Answer,
        isGetNews = req.body.news,
        isGetItunes = req.body.itunes;
    if(uname==""){
        res.send({code:0,msg:"邮箱为空"});
        return;
    }
    if(upwd==""){
        res.send({code:0,msg:"密码为空"})
        return;
    }
    if(country==""){
        res.send({code:0,msg:"地区为空"})
        return
    }
    if(user_lastName==""){
        res.send({code:0,msg:"姓氏为空"})
        return;
    }
    if(user_firstName==""){
        res.send({code:0,msg:"名字为空"})
        return;
    }
    if(birthday==""){
        res.send({code:0,msg:"生日为空"})
        return;
    }
    if(qs1==""){
        res.send({code:0,msg:"问题1为空"})
        return;
    }
    if(qs1Answer==""){
        res.send({code:0,msg:"答案1为空"})
        return;
    }
    if(qs2==""){
        res.send({code:0,msg:"问题2为空"})
        return;
    }
    if(qs2Answer==""){
        res.send({code:0,msg:"答案2为空"})
        return;
    }
    if(qs3==""){
        res.send({code:0,msg:"问题3为空"})
        return;
    }
    if(qs3Answer==""){
        res.send({code:0,msg:"答案3为空"})
        return;
    }
    if(isGetNews==""){
        res.send({code:0,msg:"公告为空"})
        return;
    }
    if(isGetItunes==""){
        res.send({code:0,msg:"iTunes为空"})
        return;
    }

    var sql = "INSERT INTO `ap_user`(`uid`, `uname`, `upwd`, `qs1`, `qs1Answer`, `qs2`, `qs2Answer`, `qs3`, `qs3Answer`, `user_lastName`, `user_firstName`, `country`, `birthday`, `isGetNews`, `isGetItunes`) VALUES (NULL,?,md5(?),?,?,?,?,?,?,?,?,?,?,?,?)";
    pool.query(sql,[uname,upwd,qs1,qs1Answer,qs2,qs2Answer,qs3,qs3Answer,user_lastName,user_firstName,country,birthday,isGetNews,isGetItunes],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"注册成功"})
        }else{
            res.send({code:0,msg:"注册失败"})
        }
    })


})

/* -----  用户登录  ------*/
router.post("/login",(req,res)=>{
    var uname = req.body.uname,
        upwd = req.body.upwd;
    if(uname==""){
        res.send({code:0,msg:"用户名为空"});
        return;
    }
    if(upwd==""){
        res.send({code:0,msg:"用户名为空"});
        return;
    }
    var sql = "SELECT uid,uname,user_firstName,user_lastName FROM ap_user WHERE uname = ? AND upwd = md5(?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            //保存登录状态到session
            req.session.uid = result[0].uid;
            var user_name = result[0].user_lastName+" "+result[0].user_firstName
            res.send({code:1,msg:"登录成功",user_name})
        }else{
            res.send({code:0,msg:"用户名或密码错误"})
        }
    })
})

/* -----  用户是否已经登录  ------*/
router.get("/isLogin",(req,res)=>{
    if(req.session.uid===undefined){
        res.send({code:0,msg:"用户未登录"})
    }else{
        res.send({code:1,msg:"用户已登录"})
    }
});

/* -----  用户注销  ------*/
router.get("/signout",(req,res)=>{
    req.session.uid=undefined;
    res.send({code:1,msg:"注销成功"})
});

module.exports = router;

