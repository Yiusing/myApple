const express = require("express");
const router = express.Router();
const pool = require("../pool");

//商品详情
router.get("/details",(req,res)=>{
    var pid = req.query.pid;
    if(pid==""){
        res.send({code:0,msg:"商品id为空"})
        return;
    }
    //获取商品详细信息
    var sql = "SELECT `pic`,`price`, `title`, `details` FROM ap_products WHERE pid=?";
    //获取商品CPU
    var sql2 = "SELECT `add_price`, `title` FROM ap_product_cpu WHERE pid=?";
    //获取商品硬盘
    var sql3 = "SELECT `add_price`, `title` FROM ap_product_harddrive WHERE pid=?";
    //获取商品软件
    var sql4 = "SELECT `add_price`, `title` FROM ap_product_soft WHERE pid=?";
    //获取商品内存
    var sql5 = "SELECT `add_price`, `title` FROM ap_product_memory WHERE pid=?";
    //获取商品包装
    var sql6 = "SELECT `title`, `bg_pic`, `sm_pic` FROM ap_product_pack WHERE pid=?";
    //获取键盘语言
    var sql7 = "SELECT `title`, `val` FROM ap_product_lang WHERE pid=?";

    var obj ={code:1,data:{}};
    pool.query(sql,[pid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            obj.data.details= result[0]
            pool.query(sql2,[pid],(err,result)=>{
                if(err)throw err;
                if(result.length>0){
                    obj.data.cpu= result
                    pool.query(sql3,[pid],(err,result)=>{
                        if(err)throw err;
                        if(result.length>0){
                            obj.data.harddrive = result;
                            pool.query(sql4,[pid],(err,result)=>{
                                if(err)throw err;
                                if(result.length>0){
                                    obj.data.soft = result
                                    pool.query(sql5,[pid],(err,result)=>{
                                        if(err)throw err;
                                        if(result.length>0){
                                            obj.data.memory = result;
                                            pool.query(sql6,[pid],(err,result)=>{
                                                if(err)throw err;
                                                if(result.length>0){
                                                    obj.data.pack = result;
                                                    pool.query(sql7,[pid],(err,result)=>{
                                                        if(err)throw err;
                                                        if(result.length>0){
                                                            obj.data.lang = result;
                                                            res.send(obj)
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

//购物车
router.get("/shoppingCart",(req,res)=>{
    var pid = req.query.pid;
    var cpu = req.query.cpu;
    var memory = req.query.memory;
    var harddrive = req.query.harddrive;
    var soft = req.query.soft;
    var lang = req.query.lang;
    var count = req.query.count;
    var totalPrice = req.query.totalPrice;
    var uid = req.session.uid;

    if(pid==""){
        res.send({code:0,msg:"商品id为空"});
        return
    }
    if(cpu==""){
        res.send({code:0,msg:"商品CPU为空"});
        return
    }
    if(memory==""){
        res.send({code:0,msg:"商品内存为空"});
        return
    }
    if(harddrive==""){
        res.send({code:0,msg:"商品硬盘为空"});
        return
    }
    if(soft==""){
        res.send({code:0,msg:"商品软件为空"});
        return
    }
    if(lang==""){
        res.send({code:0,msg:"商品键盘语言为空"});
        return
    }
    if(totalPrice==""){
        res.send({code:0,msg:"商品总价格为空"});
        return
    }
    if(uid==undefined){
        res.send({code:0,msg:"用户未登录"});
        return;
    }

    //处理soft
    for(var i=0;i<soft.length;i++){
        soft[i]=soft[i][1]
    }
    soft=soft.join(",");

    //验证对应用户对应商品是否已经添加过
    var sql = "SELECT count(cid) c FROM ap_shoppingcart WHERE uid=? AND pid=? AND cpu=? AND memory=? AND harddrive=? AND soft=? AND lang=?";
    pool.query(sql,[uid,pid,cpu,memory,harddrive,soft,lang],(err,result)=>{
        if(err)throw err;
        if(result[0].c>0){
            //用户已经添加过此商品，则sql语句更改为更新数据
            var sql ="UPDATE `ap_shoppingcart` SET `count`=? WHERE uid=? AND pid=? AND cpu=? AND memory=? AND harddrive=? AND soft=? AND lang=?";
            pool.query(sql,[count,uid,pid,cpu,memory,harddrive,soft,lang],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"商品添加成功"})
                }else{
                    res.send({code:0,msg:"商品添加失败"})
                }
            })
        }else{
            //用户未添加过此商品
            var sql = "INSERT INTO `ap_shoppingcart`(`cid`, `uid`, `pid`, `count`, `cpu`, `memory`, `harddrive`, `soft`, `lang`,`totalPrice`) VALUES (NULL,?,?,?,?,?,?,?,?,?);";
            pool.query(sql,[uid,pid,count,cpu,memory,harddrive,soft,lang,totalPrice],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"商品添加成功"})
                }else{
                    res.send({code:0,msg:"商品添加失败"})
                }
            })
        }
    })


})

//查询用户购物车信息
router.get("/userCart",(req,res)=>{
    var uid = req.session.uid;
    if(uid==undefined){
        res.send({code:0,msg:"请先登录"})
        return;
    }
    var sql ="SELECT cart.count,cart.totalPrice,pdu.title AS pdu_title,pdu.sm_pic,pdu.details,pdu.giftPack,cpu.title AS cpu_title,hd.title AS hd_title,mo.title AS mo_title,lang.title AS lang_title FROM ap_shoppingcart AS cart,ap_products AS pdu,ap_product_cpu AS cpu ,ap_product_harddrive AS hd , ap_product_memory AS mo ,ap_product_lang AS lang WHERE cart.uid = 2 AND pdu.pid = cart.pid AND cpu.cpu_id = cart.cpu AND hd.harddrive_id = cart.harddrive AND mo.memory_id = cart.memory AND lang.val = cart.lang";
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:0,msg:"用户购物车为空"})
        }
    })

});









module.exports=router;