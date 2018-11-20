$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:8080/footer.html",
        type:"get"
    }).then(res=>{
        $("#footer").replaceWith(res);
    })
})