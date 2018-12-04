new Vue({
    el:"#main",
    data:{
        unameEmpty:false,
        pwdEmpty:false,
        errorFlag:false,
        uname:"",
        upwd:"",
        errorStyle:{
            uname:{
                "error-style":false
            },
            upwd:{
                "error-style":false
            }

        },
        showErrorMsg:false
    },
    methods:{
        login(){
            // ----  设置错误样式 ----//
            this.errorFlag=true;
            this.unameEmpty = this.errorStyle.uname["error-style"] = !this.uname;
            this.errorStyle.upwd["error-style"] = !this.upwd;
            if(this.uname!=""){
                this.pwdEmpty = !this.upwd
            }else{
                this.pwdEmpty = false;
            }
            setTimeout(()=>{
                if(document.querySelector(".error-style")!=null){
                    document.querySelector(".error-style").focus();
                }
            },0)

            // ----  发送请求验证是否匹配用户和密码 ----//
            if(this.uname!=="" && this.upwd!==""){
                axios.post("http://localhost:8080/user/login","uname="+this.uname+"&upwd="+this.upwd).then(res=>{
                   if(res.data.code==1){
                       location.href="index.html";
                   }else{
                       this.showErrorMsg=true;
                       this.errorStyle.uname["error-style"]=true;
                       this.errorStyle.upwd["error-style"]=true;
                   }
                })
            }
        },
        errorToast(type){
            if(type=="uname"){
                this.unameEmpty = !this.uname;
            }else{
                this.pwdEmpty = !this.upwd;
            }
        },
        hideErrorToast(type){
            if(type=="uname"){
                this.unameEmpty = false;
            }else{
                this.pwdEmpty = false;
            }
        }
    },
    watch:{
        uname(val){

            this.unameEmpty = this.errorStyle.uname["error-style"] = !val;
        },
        upwd(val){

            this.errorStyle.upwd["error-style"] = !val;
            if(this.uname!=""){
                this.pwdEmpty = !this.upwd
            }else{
                this.pwdEmpty = false;
            }
        }
    }
})
