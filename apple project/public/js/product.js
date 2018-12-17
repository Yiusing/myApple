Vue.filter("addCommas",function(val){
    if(val==0){
        return " "
    }else if(val<0){
       return '- RMB ' +(val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').slice(1)
    }else{
        return '+ RMB '+(val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
});
Vue.filter("addCom",function(val){
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})

new Vue({
    el:"#app",
    data:{
        isFade:{
            galleryFade:{
                "gallery-fade":true
            },
            mainFade:{
                "fade":false
            }
        },
        style:{
            tx:0
        },
        fTop:{
            top:"0px"
        },
        isFixed:{
            "fixed":false
        },
        carouselX:{
            transform:"translateX(0px)"
        },
        res:{
            details:{title:"",details:""}
        },
        menuIndex:"",
        menuHeight:{
            height:""
        },
        shopIndex:"",
        shopHeight:{

        },
        showMask:false,
        proPic:[1,2,3,4],
        cpuPrice:[],
        memoryPrice:[],
        harddrivePrice:[],
        softPrice:[],
        val:{
            cpu:1,
            memory:1,
            harddrive:1,
            lang:"CH",
            soft:[[1,0],[2,0]],
            count:1
        },
        totalPrice:0
    },
    methods:{
        removeFade(){
            this.isFade.galleryFade["gallery-fade"]=false;
            this.isFade.mainFade["fade"]=true;
        },
        addFade(){
            this.isFade.galleryFade["gallery-fade"]=true;
            this.isFade.mainFade["fade"]=false;
        },
        carousel({dire,i}){
            console.log(dire);
            if(dire=="prev"){
                this.style.tx+=100;
                this.carouselX.transform=`translateX(${this.style.tx}%)`
            }
            else if(dire=="next"){
                this.style.tx-=100;
                this.carouselX.transform=`translateX(${this.style.tx}%)`
            }else{
                this.style.tx=-i*100;
                this.carouselX.transform=`translateX(${this.style.tx}%)`
            }
        },
        showMenu(e){
            this.menuIndex==1?this.showMask=false:this.showMask=true
            this.accor(e,1,'menuIndex','menuHeight',40);
        },
        showMore(e){
            this.accor(e,1,'shopIndex','shopHeight',90)
        },
        hideShopMenu(){
            this.shopHeight.height="90px";
            setTimeout(()=>{this.shopIndex=""},400)
        },
        //手风琴效果
        accor(e,i,index,classN,baseHeight){
            var p = e.target.parentNode.parentNode.parentNode;
            var height = window.getComputedStyle(e.target.parentNode.parentNode.nextElementSibling).height;
            if(this[index]!=i){
                this[index]=i;
                this[classN].height=parseInt(height)+baseHeight+40+"px";
            }else{
                this[index]="";
                this[classN].height= baseHeight+"px";
            }
        },
        showCpuPrice(i){
            // for (var j=0;j<this.cpuPrice.length;j++){
            //     if(j==i)continue
            //     this.cpuPrice[j].add_price -=this.cpuPrice[i].add_price
            // }
            // this.cpuPrice[i].add_price=0;
            this.calcPrice(i,this.cpuPrice)
        },
        showMemoryPrice(i){
            this.calcPrice(i,this.memoryPrice)
        },
        showHarddrivePrice(i){
            this.calcPrice(i,this.harddrivePrice)
        },
        calcPrice(i,price){
            for (var j=0;j<price.length;j++){
                if(j==i)continue
                price[j].add_price -=price[i].add_price
            }
            this.totalPrice+=price[i].add_price;
            price[i].add_price=0;
        },
        showSoftPrice(i,j){
            this.calcPrice(j,this.softPrice[i])
        },
        addCart(){
            this.val.pid=1;
            this.val.totalPrice=this.totalPrice;
            axios.get("http://localhost:8080/product/shoppingCart",{
                params:this.val
            }).then(res=>{
                alert(res.data.msg);
                if(res.data.code==0){
                    location.href = "login.html"
                }else{
                    location.href="shopbag.html"
                }
            })
        }
    },
    mounted(){
        //////  请求获取后台数据 //////
        var pid = 1;
        axios.get("http://localhost:8080/product/details",{
            params:{
                pid
            }
        }).then(res=>{
            this.res  = res.data.data;
            this.cpuPrice = this.res.cpu;
            this.memoryPrice = this.res.memory;
            this.harddrivePrice = this.res.harddrive;
            for(var elem of this.res.soft){
                this.softPrice.push([{add_price:0},elem])
            }
            this.totalPrice = this.res.details.price;
        });
        window.onscroll=()=>{
            var top = document.documentElement.scrollTop;
            if(this.menuIndex==1){
                this.menuIndex="";
                this.menuHeight.height="40px";
                this.showMask=false;
            }
            if(window.innerWidth<768){
                if(top>100){
                    this.shopHeight={
                        height:"90px",
                        "border-bottom": "1px solid #d6d6d6",
                        padding:"20px"
                    }
                }else{
                    this.shopHeight={
                        height:"0",
                        border:"none",
                        'padding-top':"0",
                        'padding-bottom':"0"
                    }
                }
            }
            //////  吸顶效果  /////
            if(top>212&&top<1571){
                this.isFixed.fixed=true;
            }else{
                this.isFixed.fixed=false;
            }
            if(top>=1571){
                this.fTop.top="1360px"
            }else{
                this.fTop.top="0px"
            }
        }
    },
    watch:{
        menuIndex(val){
            if(val==1){
                window.onclick=()=>{
                    this.menuIndex="";
                    this.menuHeight.height="40px";
                    this.showMask=false;
                }
            }else{
                window.onclick=null;
            }
        }
    }
})