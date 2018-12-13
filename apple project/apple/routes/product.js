const express = require("express");
const router = express.Router();
const pool = require("../pool");


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













module.exports=router;