Vue.filter("addCommas",function(val){
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})
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
        giftShow:true
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
               this.totalheight.height = parseInt(this.height.height) + (42* (this.res.giftPack==0?1:2)) + "px"
                if(this.giftPack!==""){
                    this.giftShow=false
                }else{
                    this.giftOpt="隐藏礼品选项"
                }
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
            this.totalheight.height = parseInt(this.height.height) + (42* (this.res.giftPack==0?1:2)) + "px"
            this.giftShow=false;
        }
}
})
