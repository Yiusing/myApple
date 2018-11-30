
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:8080/header.html",
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
                    scale:false
                },
                searchItem:[]
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
                },
                hideSearch(){
                    this.showSearch = false;
                    this.searchStyle.scale=false;
                }
            },
            created() {
                this.searchItem=["查找零售店","配件","iPod","AirPods","佳节好礼"]

            },
            watch: {
                showBag(val) {
                    if(val==true){
                        document.body.onclick=(e)=>{
                            if (e.target.className != "shoppingbag"){
                                this.showBag = false
                            }
                        }
                    }else{
                        document.body.onclick=null;
                    }

                },
                showSearch(val) {
                    if(val==true){
                        document.body.onclick=(e)=>{
                            if (e.target.className != "search-input"){
                                this.showSearch = false;
                                this.searchStyle.scale=false;
                            }
                        }
                    }else{
                        document.body.onclick=null;
                    }

                },
                search(val){
                    this.isDisabled.disabled= (val==="")
                }
            }
        })
    })

