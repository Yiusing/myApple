$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:8080/footer.html",
        type:"get"
    }).then(res=>{
        $("#footer").replaceWith(res);
        new Vue({
            el:"#footer",
            data:{
                menuStyle:{
                    more:{
                        more:false
                    },
                    shop:{
                        shop:false
                    },
                    edu:{
                        edu:false
                    },
                    bus:{
                        bus:false
                    },
                    ac:{
                        ac:false
                    },
                    val:{
                        val:false
                    },
                    ab:{
                        ab:false
                    }
                }
            },
            methods:{
                showMenu(n){

                    switch (n) {
                        case 1:
                            this.menuStyle.more.more=!this.menuStyle.more.more;
                            this.hideMenu("more");
                            break;
                        case 2:
                            this.menuStyle.shop.shop=!this.menuStyle.shop.shop;
                            this.hideMenu("shop");
                            break;
                        case 3:
                            this.menuStyle.edu.edu=!this.menuStyle.edu.edu;
                            this.hideMenu("edu");
                            break;
                        case 4:
                            this.menuStyle.bus.bus=!this.menuStyle.bus.bus;
                            this.hideMenu("bus");
                            break;
                        case 5:
                            this.menuStyle.ac.ac=!this.menuStyle.ac.ac;
                            this.hideMenu("ac");
                            break;
                        case 6:
                            this.menuStyle.val.val=!this.menuStyle.val.val;
                            this.hideMenu("val");
                            break;
                        default:
                            this.menuStyle.ab.ab=!this.menuStyle.ab.ab;
                            this.hideMenu("ab");
                    }

                },
                hideMenu(k){
                    for(var key in this.menuStyle){
                        if(key==k){
                            continue;
                        }
                        this.menuStyle[key][key]=false;
                    }
                }
            }

        })
    })
})