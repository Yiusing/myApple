Vue.filter("addCommas",function(val){
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
});
new Vue({
    el:"#app",
    data:{
        count:1,
        res:{},
        height:{
            height:"0px"
        },
        giftPack:"",
        totalheight:{
            height:"0px"
        },
        giftOpt:"显示礼品选项",
        giftShow:true,
        details:{
            "details-show":false
        },
        detailsHeight:{

        },
        qsHeight:{
            height:"49px"
        },
        productsIndex:"",
        qsIndex:"",
        i:1
    },
    methods:{
        changeCount(n){
            if(n==1){
                this.count++;
            }else{
                if(this.count>1)
                    this.count--;
            }
        },
        showMore(){
            if(parseInt(this.totalheight.height)>0){
                this.totalheight.height = "0px";
                this.giftOpt="显示礼品选项";
                this.giftShow=true
            }else{
               this.totalheight.height = parseInt(this.height.height) + (38 * (this.res.giftPack==0?1:2)) + "px"
                if(this.giftPack!==""){
                    this.giftShow=false
                }else{
                    this.giftOpt="隐藏礼品选项"
                }
            }
        },
        showDetails(e,i){
            // var detials = document.querySelector(".product-details");
            // var height = window.getComputedStyle(detials).height;
            // if(!this.details["details-show"]){
            //     this.details["details-show"]=true;
            //     this.detailsHeight.height=parseInt(height)+47+"px";
            // }else{
            //     this.details["details-show"]=false;
            //     this.detailsHeight.height="47px";
            // }
            this.accor(e,i,'productsIndex','detailsHeight',42)
        },
        showQsDetials(e,i){
            this.accor(e,i,'qsIndex','qsHeight',49)
        },
        //手风琴效果
        accor(e,i,index,classN,baseHeight){
            var p = e.target.parentNode.parentNode;
            var height = window.getComputedStyle(e.target.parentNode.nextElementSibling).height;
            if(this[index]!=i){
                this[index]=i;
                this[classN].height=parseInt(height)+baseHeight+"px";
            }else{
                this[index]="";
                this[classN].height= baseHeight+"px";
            }
        }
    },
    mounted(){
        var res = {price:12459,count:1,giftPack:1};
        ////最小高度 143px
        this.res=res;

    },
    computed:{
        total(){
            return this.count * this.res.price;
        }
    },
    watch:{
        giftPack(){
            this.height.height="101px";
            this.totalheight.height = parseInt(this.height.height) + (38 * (this.res.giftPack==0?1:2)) + "px"
            this.giftShow=false;
        },
        count(val){
            this.count = val.replace(/[^\d]/g,"")
            if(val<1){
                this.count=1;
            }
        }
}
})
