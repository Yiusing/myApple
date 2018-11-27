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
        imds:{
            pic:"img/idms/1.jpg",
            code:"CDXV"
        },
        errorStyle:{
            "error-style":true
        },
        firstName:"",
        lastName:"",
        email:"",
        pwd:"",
        rPwd:"",
        qs1:"",
        qs2:"",
        qs3:"",
        idms:"",
        flag:{
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
        }
    },
    methods:{
        /***********  日期  ***************/
        showTips(show){
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
            e.preventDefault();
            var keycode = e.keyCode;
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
            var n = Math.ceil(Math.random()*10)
            this.imds.pic = `img/idms/${n}.jpg`
        },
        checkAll(){
            ///// 验证姓氏和名字 /////
            var reg = /^[a-z0-9\u4e00-\u9fa5]{1,32}$/i;
            if(!reg.test(this.lastName)){
                this.flag.lastName=true;
            }

        },
        removeStyle(){
            console.log(1)
            this.errorStyle["error-style"]=false;
        }
    },
    watch:{

    },
    mounted(){
        /********  模拟发送请求取得数据 **********/

    }
})
