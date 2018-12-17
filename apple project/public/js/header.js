
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    $.ajax({
        url:"http://127.0.0.1:8080/header.html",
        type:"get"
    }).then(res=> {
        $("#header").replaceWith(res);
        new Vue({
            el: "#header",
            data: {
                showBag: false,
                showSearch: false,
                search:"",
                isDisabled:{
                    disabled:false
                },
                searchStyle:{
                    scale:false,
                    "show-menu":false,
                    "show-search":false
                },
                searchItem:[],
                showMask:false,
                user_name:"",
                isLogin:false,
                menuIcon:{
                    "menu-close":false
                },
                isDark:{
                    background:"#000"
                },
                res:{},
                productsDetails:[]
            },
            methods: {
                showDetails() {
                    this.showBag = !this.showBag;
                },
                showSearchBox(){
                    setTimeout(()=>{
                        this.showSearch=true;
                    },300)
                    this.searchStyle.scale=true;
                    this.showMask=true;
                    document.body.style.overflowY = "hidden";
                },
                hideSearch(){
                    this.showSearch = false;
                    this.searchStyle.scale=false;
                    this.showMask=false;
                    document.body.style.overflowY = "auto";
                },
                checkLogin(){
                    axios("http://localhost:8080/user/isLogin").then(res=>{
                        if(res.data.code==1){
                            this.user_name = res.data.user_name;
                            this.isLogin = true;
                        }else{
                            this.isLogin = false;
                        }
                    })
                },
                signout(){
                    axios("http://localhost:8080/user/signout").then(res=>{
                        location.reload()
                    })
                },
                showMenu(){
                    console.log(this.showSearch)
                    this.searchStyle["show-menu"] = this.searchStyle["menu-close"] = !this.searchStyle["menu-close"];
                    var isHide="auto";
                    this.searchStyle["menu-close"]?isHide="hidden":isHide="auto";
                    document.body.style.overflowY = isHide;
                },
                clickShowSearchBox(){
                    this.showSearch = this.searchStyle["show-search"]=true;
                },
                clickHideSearchBox(){
                    this.searchStyle["show-search"]=false;
                },
                toProducts(i){
                    location.href="product.html"
                }
            },

            created() {
                this.searchItem=["查找零售店","配件","iPod","AirPods","佳节好礼"];
                //判断是否登录
                this.checkLogin();
                window.onresize=()=>{
                    if(window.innerWidth>=768){
                        this.searchStyle["show-menu"] = this.searchStyle["menu-close"] = false;
                        this.showSearch = false;
                        this.searchStyle["show-search"]=false;
                    }
                    if(window.innerWidth<768){
                        this.showMask = this.searchStyle.scale = this.showSearch = false;
                        document.body.style.overflowY = "auto";
                        this.showSearch = true;
                    }
                };
                if(window.innerWidth>=768){
                    this.showSearch = false;
                }else{
                    this.showSearch = true;
                }

                //购物车信息
                axios.get("http://localhost:8080/product/userCart").then(res=>{
                    console.log(res.data.data);
                    this.res = res.data.data;
                    if(res.data.code===1){
                        var data = res.data.data;
                        for(var i=0;i<2;i++){
                            this.productsDetails[i]=[data[i].cpu_title.trim(),data[i].hd_title,data[i].mo_title];
                        }
                    }
                })
            },
            watch: {
                showBag(val) {
                    if(val==true){
                        document.body.onclick=(e)=>{
                            if (e.target.className != "bag-details" && e.target.className !="bag-link"){
                                this.showBag = false
                            }
                        }
                    }else{
                        document.body.onclick=null;
                    }

                },
                showSearch(val) {
                    if(window.innerWidth>=768){
                        if(val==true){
                            document.body.onclick=(e)=>{
                                if (e.target.className != "search-input"){
                                    this.showSearch = false;
                                    this.searchStyle.scale=false;
                                    this.showMask=false;
                                    document.body.style.overflowY = "auto";
                                }
                            }
                        }else{
                            document.body.onclick=null;
                        }
                    }
                },
                search(val){
                    this.isDisabled.disabled= (val==="")
                }
            }
        })
    })

