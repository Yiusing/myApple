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
        res:{}
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
        }
    },
    mounted(){
        //////  请求获取后台数据 //////
        var res = {
            proPic:[1,2,3,4]
        }
        this.res = res;
        //////  吸顶效果  /////
        window.onscroll=()=>{
            var top = document.documentElement.scrollTop;

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