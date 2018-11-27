new Vue({
    el:"#app",
    data:{
        isHide:true,
        birthday:"",
        flag:true,
        flag2:true,
        cursorIndex:[0,1,2,3,5,6,8,9,11],
        spliceIndex:0,
        char:""
    },
    methods:{
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
                    if(this.spliceIndex<0){this.spliceIndex=0}
                    if(this.spliceIndex<4){
                        this.char = "y"
                    }else if(this.spliceIndex<6){
                        this.char = "m"
                    }else{
                        this.char = "d"
                    }
                    console.log(this.spliceIndex)
                    arr.splice(this.spliceIndex,1,this.char)
                }
                console.log(arr)
                //刷新表单的值
                setTimeout(()=>{
                    arr.splice(4,0,"年")
                    arr.splice(7,0,"月")
                    arr.splice(10,0,"日")
                    this.birthday = arr.join("");
                },0)
                this.cursorPoint();
                this.canInput=false;
            }else{
                return;
            }
        }
    },
    watch:{

    }
})
