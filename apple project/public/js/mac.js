$(function(){
    //////////////////  顶部轮播  ///////////////////////
    function carouselTop(){
        var left = [-30,15,65,110]
        ////控制数组顺序/////
        function changeArr(arr,direct="normal"){
            var newArr = arr.slice(0);
            if(direct=="normal"){
                for(var i=0;i<arr.length;i++){
                    if(i==0){
                        //console.log(arr[i]);
                        arr[i]=newArr[arr.length-1]
                        //arr[0]=newArr[4]
                        //console.log(arr[i]);
                    }else{
                        arr[i]=newArr[i-1]
                        //arr[1]=newArr[0]
                        //arr[2]=newArr[1]
                        //arr[3]=newArr[2]
                        //arr[4]=newArr[3]
                    }
                }
            }else{
                for(var i=0;i<arr.length;i++){
                    if(i==arr.length-1){
                        arr[i]=newArr[0]
                        //arr[4]=newArr[0]
                    }else{
                        arr[i]=newArr[i+1]
                        //arr[3]=newArr[4]
                        //arr[2]=newArr[3]
                        //arr[1]=newArr[2]
                    }
                }
            }
        }
        $("[data-toggle=slide]").on("click","[data-toggle=link]",function(e) {
            e.preventDefault();
            var $btn = $(this);
            var $li = $btn.parent();
            // var left = [];
            var $lis = $("[data-toggle=slide]").children();
            // $lis.each(function (i, elem) {
            //     var $elem = $(elem);
            //     left.push($elem.css("left"));
            // })
            //判断左右
            /*if($li.is("[data-slide=left]")){
                //先动态设置transition
                if($("[data-slide=left]").index()==0){
                    $btn.parent().siblings(":last").css("transition","none").siblings().css("transition","left 1s linear")
                }else{
                    $("[data-slide=left]").prev().css("transition","none").siblings().css("transition","left 1s linear");
                }
                if($li.index()==$lis.length-2){
                    $li.next().attr("data-slide","left").siblings(":first").attr("data-slide","right")
                }else if($li.index()==$lis.length-1){
                    $li.siblings(":first").attr("data-slide","left").next().attr("data-slide","right");
                }else{
                    $li.next().attr("data-slide","left").next().attr("data-slide","right");
                }
                for(var i=0;i<left.length;i++){
                    if(i==0){
                        $($lis[i]).css({
                            "left":left[left.length-1]
                        })
                    }
                    else{
                        $($lis[i]).css({
                            "left":left[i-1]
                        });
                    }
                }

            }else{
                if($("[data-slide=right]").index()==$lis.length-1){
                    $btn.parent().siblings(":first").css("transition","none").siblings().css("transition","left 1s linear")
                }else{
                    $("[data-slide=right]").next().css("transition","none").siblings().css("transition","left 1s linear");
                }
                if($li.index()==1){
                    $li.prev().attr("data-slide","right").siblings(":last").attr("data-slide","left")
                }else if($li.index()==0){
                    $li.siblings(":last").attr("data-slide","right").prev().attr("data-slide","left");
                }else{
                    $li.prev().attr("data-slide","right").prev().attr("data-slide","left");
                }
                for(var i=0;i<left.length;i++){
                    if(i==left.length-1){
                        $($lis[i]).css({
                            "left":left[0]
                        })
                    }
                    else{
                        $($lis[i]).css({
                            "left":left[i+1]
                        });
                    }
                }
            }
            //清空当前状态
            $li.attr("data-slide","");
        })*/
            function slideMain() {
                var siblings, index, rDir, add, direction;
                ////判断左右
                if ($li.is("[data-slide=left]")) {
                    direction = "left";
                } else if($li.is("[data-slide=right]")) {
                    direction = "right";
                } else{
                    return;
                }
                if (direction == "left") {
                    siblings = [":last", ":first"];
                    $.fn.pN = $.fn.next;
                    $.fn.rPN = $.fn.prev;
                    rDir = "right";
                    add = -1;
                    index = [0, $lis.length - 2, $lis.length - 1];
                    //控制left数组
                    changeArr(left,"normal");
                } else {
                    siblings = [":first",":last"];
                    $.fn.pN = $.fn.prev;
                    $.fn.rPN = $.fn.next;
                    rDir = "left";
                    add = +1;
                    index = [$lis.length - 1, 1, 0];
                    //控制left数组
                    changeArr(left,"reverse");
                }
                if ($(`[data-slide=${direction}]`).index() == index[0]) {
                    $btn.parent().siblings(siblings[0]).css("transition", "none").siblings().css("transition", "left .7s ease")
                } else {
                    $(`[data-slide=${direction}]`).rPN().css("transition", "none").siblings().css("transition", "left .7s ease");
                }
                if ($li.index() == index[1]) {
                    $li.pN().attr("data-slide", direction).siblings(siblings[1]).attr("data-slide", rDir)
                } else if ($li.index() == index[2]) {
                    $li.siblings(siblings[1]).attr("data-slide", direction).pN().attr("data-slide", rDir);
                } else {
                    $li.pN().attr("data-slide", direction).pN().attr("data-slide", rDir);
                }
                /*for (var i = 0; i < left.length; i++) {
                    if (i == index[0]) {
                        $($lis[i]).css({
                            "left": `${left[index[2]]}%`
                        })
                    }
                    else {
                        $($lis[i]).css({
                            "left": `${left[i + add]}%`
                        });
                    }
                }*/
                for(var i=0;i<$lis.length;i++){
                    $($lis[i]).css("left",`${left[i]}%`)
                }
                //清空当前状态
                $li.attr("data-slide", "");
            }
            slideMain();
            ///////// 控制左右链接  ////////////
            $("[data-slide=left]").addClass("active").siblings().removeClass("active");
            //////// 控制背景video /////
            if($("[data-slide=left]").children().is("[data-target=code]")){
                $("#code").removeClass("gFade")
                    .siblings("#photo")
                    .addClass("gFade")
                    .siblings(".gallery-dotnav")
                    .children()
                    .children(":last")
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            }else if($("[data-slide=left]").children("[data-target=photo]")){
                console.log(1)
                $("#photo").removeClass("gFade")
                    .siblings("#code")
                    .addClass("gFade")
                    .siblings(".gallery-dotnav")
                    .children()
                    .children(":first")
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            }
        })
        /// dotnav ///
        $("[data-toggle=dotnav]").on("click","[data-trigger]",function(e){
            e.preventDefault();
            $("[data-slide=right]").children().click();
        })
    }
    carouselTop();

    ///////////////////  切换对应图文  //////////////////////////
    $("[data-toggle=fade]").on("click","[data-toggle=link]",function(e){
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass("current-link")
            .parent()
            .siblings()
            .children().removeClass("current-link")
        var i =  $btn.parent().index();
        $($btn.parent()
            .parent()
            .parent()
            .nextAll()[i]).removeClass("fade")
            .siblings(":gt(0):not(.fade)").addClass("fade");
    })


})
new Vue({
    el:"#app",
    data:{
        left:{
            transform:"translateX(0)"
        },
        canMove:false,
        posS:"",
        rate:1,
        current:0,
        now:0
    },
    methods:{
        getPos(e){
            this.canMove=true;
            this.posS= e.touches[0].clientX;
        },
        scrollTab(e){
            this.current=e.touches[0].clientX;

            //     //右边尽头
            //     if(this.current<-window.innerWidth){
            //         //left*=this.rate;
            //
            //     }
            this.now = parseFloat(this.left.transform.slice(11));
            //左边尽头
            if(this.now>0){
                this.rate=0.1;
            }else if(this.now<-window.innerWidth-30){
                this.rate=0.1;
            }else{
                this.rate=1;
            }
            this.now +=this.rate*(this.current-this.posS);
            this.left.transform = `translateX(${this.now}px)`
            this.left.transition="none";
            this.posS = this.current;
        },
        release(e){
            this.canMove=false;
           if(this.now>0){
               this.left={
                   "transform":"translateX(0)",
                   "transition":"transform .4s linear"
               };
           }
           if(this.now<-window.innerWidth){
               this.left={
                   "transform":`translateX(-${window.innerWidth-30}px)`,
                   "transition":"transform .4s linear"
               };
           }
        }

    },
    watch:{
        // left(){
        //     var l = this.posL*=this.rate;
        //     this.left.transform = `translateX(${this.posL}px)`
        // }
        current(val){

        }
    }
})