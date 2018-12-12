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
        res:{},
        menuIndex:"",
        menuHeight:{
            height:""
        },
        shopIndex:"",
        shopHeight:{
            height:"90px"
        }
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
        }
    },
    mounted(){
        //////  请求获取后台数据 //////
        var res = {
            proPic:[1,2,3,4]
        }
        this.res = res;

        window.onscroll=()=>{
            var top = document.documentElement.scrollTop;
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
                    padding:"0"
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
    }
})