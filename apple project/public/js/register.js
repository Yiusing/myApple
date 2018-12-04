new Vue({
    el:"#app",
    data:{
        isHide:true,
        birthday:"",
        flag:true,
        flag2:true,
        cursorIndex:[0,1,2,3,5,6,8,9,11],
        spliceIndex:0,
        char:"",
        idms:{
            result:[],
            idms_url:"",
            idms_codes:""
        },
        errorStyle:{
            "error-style":true
        },
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        rPwd:"",
        qs1:"",
        qs1Answer:"",
        qs2:"",
        qs2Answer:"",
        qs3:"",
        qs3Answer:"",
        idmsCode:"",
        country:"CHN",
        news:0,
        itunes:0,
        checkflag:{
            firstName:false,
            lastName:false,
            birthday:false,
            email:false,
            pwd:false,
            rPwd:false,
            qs1:false,
            qs2:false,
            qs3:false,
            idms:false
        },
        progress:{
            weak:false,
            medium:false,
            strong:false
        },
        progressActive:{
            active:true
        },
        progressFlag:{
            p1:false,
            p2:false,
            p3:false
        },
        pwdTips:false,
        strength:"",
        rPwdError:false,
        qs1Error:false,
        qs2Error:false,
        qs3Error:false,
        idmsError:false,
        fnError:false,
        lnError:false,
        bthError:false,
        emailError:false,
        qs1ErrorMsg:"选择一个问题。",
        qs2ErrorMsg:"选择一个问题。",
        qs3ErrorMsg:"选择一个问题。"
    },
    methods:{
        /***********  日期  ***************/
        showBirTips(show){
            this.isHide=show==false;
        },
        showBirthday(type,show){
            //判断是否为onfucs
            if(type=="fc"){
                this.flag=false;
            }

            if(show==true){
                this.birthday="yyyy年mm月dd日"
            }else{
                this.birthday="";
                this.flag=true;
            }
        },
        cursorPoint(){
            //获取光标
            var input = document.querySelector("[name=birthday]");

            setTimeout(()=>{
                input.setSelectionRange(this.cursorIndex[this.spliceIndex],this.cursorIndex[this.spliceIndex])
            },0)
        },
        changeBir(e){
            //禁止输入文本，并且由按键的来获取用户输入的值
            var keycode = e.keyCode;
            if(keycode!=9){
                e.preventDefault();
            }
            //转换小键盘数值
            if(keycode>95&&keycode<106){
                keycode-=48;
            }
            if((keycode>47&&keycode<58)||keycode==8){
                var keyValue = String.fromCharCode(keycode);
                this.flag2=false;
                var arr = this.birthday.replace(/年|月|日/g,"").split("");
                var len = arr.length;
                //控制日期的输入
                switch (this.spliceIndex) {
                    case 0:
                        if ((keycode != 49) && (keycode !=50)){
                            console.log(1)
                            return
                        }
                        break;
                    case 1:
                        if(keycode != 8){
                            if(arr[0]==1){
                                if( (keycode !=56) && (keycode != 57)){
                                    return;
                                }
                            }else{
                                if( (keycode !=48) && (keycode != 49)){
                                    return;
                                }
                            }
                        }
                        break;
                    case 2:
                        if(keycode != 8){
                            if(arr[1]==8){
                                if( (keycode<54) || (keycode>57)){
                                    return;
                                }
                            }
                            if(arr[0]==2 && arr[1]==1){
                                if( (keycode>=55) && (keycode<=57)){
                                    return;
                                }
                            }
                        }
                        break;
                    case 3:
                        if(keycode != 8 ){
                            if(arr[1]==8 && arr[2]==6){
                                if( (keycode != 56) && (keycode != 57)){
                                    return;
                                }
                            }
                            if(arr[0]==2 && arr[1]==1 && arr[2]==6){
                                if( keycode == 57){
                                    return;
                                }
                            }
                        }
                        break;
                    case 4:
                        if(keycode != 8 ) {
                            if ((keycode != 48) && (keycode != 49)) {
                                return
                            }
                        }
                        break;
                    case 5:
                        if(keycode != 8 ) {
                            if(arr[4]==0){
                                if (keycode == 48) {
                                    return
                                }
                            }else{
                                if ((keycode != 48) && (keycode != 49) && (keycode != 50)) {
                                    return
                                }
                            }
                        }
                        break;
                    case 6:
                        if(keycode != 8 ){
                            if (keycode<48 || keycode>51) {
                                return
                            }
                            if(arr[4]==0 && arr[5] == 2){
                                if (keycode<48 || keycode>50) {
                                    return
                                }
                            }

                        }
                        break;
                    case 7:
                        if(keycode != 8 ) {
                            if (arr[6] == 0) {
                                if (keycode == 48) {
                                    return
                                }
                            }
                            if (arr[6] == 3) {
                                if (((arr[4] == 0) && (arr[5] == 1 || arr[5] == 3 || arr[5] == 5 || arr[5] == 7 || arr[5] == 8)) || ((arr[4] == 1) && (arr[5] == 0 || arr[5] == 2))) {
                                    console.log(1)
                                    if (keycode != 48 && keycode != 49) {
                                        return
                                    }
                                } else {
                                    if (keycode != 48) {
                                        return
                                    }
                                }
                            }
                        }

                        //判断闰年
                        var y = arr.slice(0,4).join("");
                        if(arr[4]==0 && arr[5] == 2){
                            if(arr[6]==2){
                                if( (y%4==0 && y%100!=0) || (y%400==0)){
                                    if(keycode==57){
                                        return;
                                    }
                                }
                            }
                        }

                        break;
                }
                // if(this.spliceIndex==0) {
                //     if (keycode != 49)
                //         return
                // }
                if(keycode!=8){
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].search(/y|m|d/)!=-1){
                            arr[i] = keyValue;
                            this.spliceIndex=i+1;
                            break;
                        }
                    }
                    if(this.spliceIndex>8){this.spliceIndex=8}

                }else{
                    this.spliceIndex--;
                    if(this.spliceIndex<0){
                        this.spliceIndex=0
                    }
                    if(this.spliceIndex<4){
                        this.char = "y"
                    }else if(this.spliceIndex<6){
                        this.char = "m"
                    }else{
                        this.char = "d"
                    }
                    arr.splice(this.spliceIndex,1,this.char)
                }
                //刷新表单的值
                setTimeout(()=>{
                    arr.splice(4,0,"年")
                    arr.splice(7,0,"月")
                    arr.splice(10,0,"日")
                    this.birthday = arr.join("");
                    if(this.birthday=="yyyy年mm月dd日"){
                        this.flag2=true;
                    }
                },0)
                this.cursorPoint();
                this.canInput=false;
            }else{
                return;
            }
        },
        changeIdms(){
            var iNow = this.idms.idms_url.slice(-5,-4);
            var imgArr = this.idms.result.slice(0);
            var len = this.idms.result.length;
            //去掉重复
            imgArr.splice(iNow-1,1);
            var i = Math.ceil(Math.random()*(len-2));
            this.idms.idms_url = imgArr[i].idms_url;
            this.idms.idms_codes = imgArr[i].idms_codes;
            console.log(this.idms)
        },
        register(){
            /////  验证并且提交表单  //////
            ///// 验证姓氏和名字 /////
            var reg = /^[a-z0-9\u4e00-\u9fa5]{1,32}$/i;
            this.lnError = this.checkflag.lastName=(!reg.test(this.lastName));
            this.fnError = this.checkflag.firstName=(!reg.test(this.firstName));

            //// 验证生日日期 /////
            var reg = /^\d{4}年\d{2}月\d{2}日$/
            this.bthError = this.checkflag.birthday=(!reg.test(this.birthday));

            //验证邮箱
            var reg = /^[\w-]+@[\w-]+(\.[\w-]+)+$/
            this.emailError = this.checkflag.email=(!reg.test(this.email));

            //验证密码
            var reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/;
            this.checkflag.pwd = (!reg.test(this.password));
            this.rPwdError = this.checkflag.rPwd = (this.rPwd!=this.password || this.rPwd=="");

            //// 验证验证码  /////
            this.idmsError =  this.checkflag.idms =(this.idmsCode.toLocaleLowerCase()!=this.idms.idms_codes.toLocaleLowerCase());

            //// 验证问题 ////
            if(this.qs1!=""){
                if(this.qs1Answer==""){
                    this.qs1ErrorMsg="输入答案。"
                }else{
                    this.qs1Error=false;
                    this.checkflag.qs1 = false;
                }
            }else{
                this.checkflag.qs1 = true;
                this.qs1Error=true;
            }
            if(this.qs2!=""){
                if(this.qs2Answer==""){
                    this.qs2ErrorMsg="输入答案。"
                }else{
                    this.qs2Error=false;
                    this.checkflag.qs2 = false;
                }
            }else{
                this.qs2Error=true;
                this.checkflag.qs2 = true;
            }
            if(this.qs3!=""){
                if(this.qs3Answer==""){
                    this.qs3ErrorMsg="输入答案。"
                }else{
                    this.qs3Error=false;
                    this.checkflag.qs3 = false;
                }
            }else{
                this.qs3Error=true;
                this.checkflag.qs3 = true;
            }
            setTimeout(()=>{
                var err = document.querySelector(".error-style");
                if(err!==null){
                    err.focus();
                }
            });

            var count = 0;
            for(var c in this.checkflag){
                if(!this.checkflag[c]){
                    count++;
                }
            }
            ////////  全部验证成功后发送请求注册用户   //////////
            if(count==10){
                var userObj = {
                    lastName:this.lastName,
                    firstName:this.firstName,
                    country: this.country,
                    birthday:this.birthday,
                    email:this.email,
                    password:this.password,
                    qs1:this.qs1,
                    qs1Answer:this.qs1Answer,
                    qs2:this.qs2,
                    qs2Answer:this.qs2Answer,
                    qs3:this.qs3,
                    qs3Answer:this.qs3Answer,
                    news:this.news?1:0,
                    itunes:this.itunes?1:0
                };
                axios.post("http://localhost:8080/user/register",Qs.stringify(userObj)).then(res=>{
                   if(res.data.code==1){
                       location.href="login.html"
                   }else{
                       alert(res.data.msg)
                   }
                })
            }
        },
        showTips(){
            this.pwdTips=true;
        },
        hideTips(){
            this.pwdTips=false;
        },
        checkrPwd(){
            this.rPwdError=(this.rPwd!=this.password);
        },
        checkQuestion(sel){
            switch (sel) {
                case 1:
                    if(this.qs1!=""){
                        if(this.qs1Answer==""){
                            this.qs1ErrorMsg="输入答案。"
                        }else{
                            this.qs1Error=false;
                        }
                    }else{
                        this.qs1Error=true;
                    }
                    break;
                case 2:
                    if(this.qs2!=""){
                        if(this.qs2Answer==""){
                            this.qs2ErrorMsg="输入答案。"
                        }else{
                            this.qs2Error=false;
                        }
                    }else{
                        this.qs2Error=true;
                    }
                    break;
                default:
                    if(this.qs3!=""){
                        if(this.qs3Answer==""){
                            this.qs3ErrorMsg="输入答案。"
                        }else{
                            this.qs3Error=false;
                        }
                    }else{
                        this.qs3Error=true;
                    }
                    break
            }

        }
    },
    watch:{
        lastName(){
            this.checkflag.lastName=false;
        },
        firstName(){
            this.checkflag.firstName=false;
        },
        email(val){
            //验证邮箱
            var reg = /^[\w-]+@[\w-]+(\.[\w-]+)+$/
            this.emailError = this.checkflag.email=(!reg.test(val));
        },
        password(val){
            //验证密码

            //判断弱和中等
            var pattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/;
            if(pattern.test(val)){
                this.checkflag.pwd=false;
            }
            var pattern2 = /^.*(1234)+(12345)?(123456)?(654321)?(54321)?(4321)?.*$/;
            this.progress.weak=(pattern2.test(val) && pattern.test(val));
            this.progress.medium=(!pattern2.test(val) && pattern.test(val));
            if(!pattern.test(val)){
                this.strength="";
            }

            // if(pattern.test(val)){
            //     this.progress.weak=pattern2.test(val);
            //     this.progress.medium=!pattern2.test(val);
            // }else{
            //     this.progress.weak=false;
            //     this.progress.medium=false;
            // }

            //弱
            // var pattern = /^.*(?=.{8,16})(?=(123456)?)(?=(12345)?)(?=(1234)?)(?=(1234)?)(?=(123)?)(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/;
            // this.progress.weak = pattern.test(val)
            //中等
            // pattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/;
            // this.progress.medium = pattern.test(val)
            //强
            pattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/
            this.progress.strong = pattern.test(val)

            if(this.progress.weak){
                this.strength="弱"
            }
            if(this.progress.medium){
                this.strength="中等";
            }
            if (this.progress.strong){
                this.strength="强";
            }


            //控制进度条
            pattern = /^.*(?=.{8,16}).*$/
            this.progressFlag.p1=pattern.test(val);
            pattern = /^.*(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/
            this.progressFlag.p2=pattern.test(val);
            pattern = /^.*(?=.*\d).*$/
            this.progressFlag.p3=pattern.test(val);
        },
        rPwd(){
            this.checkflag.rPwd=false;
        },
        qs1Answer(){
            this.checkflag.qs1=false;
        },
        qs2Answer(){
            this.checkflag.qs2=false;
        },
        qs3Answer(){
            this.checkflag.qs3=false;
        }
    },
    mounted(){
        /*------ 想数据发送请求获得数据 ------*/
          /*--- 验证码 ---*/
        axios.get("http://127.0.0.1:8080/user/idms").then(res=>{
            this.idms.result = res.data.result;
            var i = Math.ceil(Math.random()*9)
            this.idms.idms_url = this.idms.result[i].idms_url;
            this.idms.idms_codes = this.idms.result[i].idms_codes;
        })

    }
})
