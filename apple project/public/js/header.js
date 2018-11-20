$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:8080/header.html",
        type:"get"
    }).then(res=>{
        $("#header").append(res);
    })
})