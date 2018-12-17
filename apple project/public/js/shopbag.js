Vue.filter("addCommas",function(val){
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
});
new Vue({
    el:"#app",
    data:{
        count:1,
        res:{},
        height:{
            height:[]
        },
        giftPack:[],
        totalheight:{
            height:[

            ]
        },
        giftOpt:"显示礼品选项",
        giftShow:[],
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
        giftIndex:"",
        hasLogin:false

    },
    methods:{
        changeCount(n,index){
            if(n==1){
                this.res[index].count++;
            }else{
                if(this.res[index].count>1)
                    this.res[index].count--;
            }
        },
        // showMore(index){
        //     if(index!==this.giftIndex){
        //         this.totalheight.height=0;
        //
        //     }
        //     this.giftIndex = index;
        //     if(parseInt(this.totalheight.height)>0){
        //         this.totalheight.height = "0px";
        //         this.giftOpt="显示礼品选项";
        //         this.giftShow=true
        //     }else{
        //         this.totalheight.height = parseInt(this.height.height) + (38 * (this.res[index].giftPack==0?1:2)) + "px"
        //         if(this.giftPack!==""){
        //             this.giftShow=false
        //         }else{
        //             this.giftOpt="隐藏礼品选项"
        //         }
        //     }
        //
        // },
        showMore(index){
            this.giftIndex = index;
            if(parseInt(this.totalheight.height[index].height)>0){
                this.totalheight.height[index].height = "0px";
                this.giftOpt="显示礼品选项";
                this.giftShow[index]=false
            }else{
                this.totalheight.height[index].height = parseInt(this.height.height[index].height) + (38 * (this.res[index].giftPack==0?1:2)) + "px"
                if(this.giftPack!==""){
                    this.giftShow[index]=true
                }else{
                    this.giftOpt="隐藏礼品选项"
                }
            }

        },
        showDetails(e,i){
            // var detials = document.querySelector(".product-details");
            // var height = window.getComputedStyle(detials).height;
            // console.log(this.details["details-show"])
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
            if(this[index]!==i){
                this[index]=i;
                this[classN].height=parseInt(height)+baseHeight+"px";
            }else{
                this[index]="";
                this[classN].height= baseHeight+"px";
            }
        },
        changeIndex(index){
            this.giftIndex=index;
        }
    },
    mounted(){

        //发送请求获取购物车信息
        axios.get("http://localhost:8080/product/userCart").then(res=>{
            this.hasLogin=res.data.code===1;
            if(res.data.code===1){
                this.res=res.data.data;
                for(var i=0;i<this.res.length;i++){
                    this.totalheight.height.push({height:"0"})
                    this.height.height.push({height:"0"})
                }
            }
        })

    },
    computed:{
        total(){
            return this.count * this.res.price;
        },
        totalPrice(){
           var sum = 0;
            for(var i=0;i<this.res.length;i++){
               sum+=this.res[i].totalPrice*this.res[i].count
           }
           return sum;
        }
    },
    watch:{
        giftPack(){
            this.height.height[this.giftIndex].height="101px";
            this.totalheight.height[this.giftIndex].height = parseInt(this.height.height[this.giftIndex].height) + (38 * (this.res.giftPack==0?1:2)) + "px"
            this.giftShow[this.giftIndex]=true;
        },
        count(val){
            this.count = val.replace(/[^\d]/g,"")
            if(val<1){
                this.count=1;
            }
        }
    }
})
