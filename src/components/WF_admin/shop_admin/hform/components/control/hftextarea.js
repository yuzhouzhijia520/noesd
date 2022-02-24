export default (_self, h) => {
    return [
        h('el-checkbox', {
            style:"margin-left:20px",
            props: {
                key: 0
            },
            attrs:{
                value:  _self.obj.arrType[0].arrType[1].value // 处理默认显示的
            },
            on: {
                change: (value) => {
                    _self.obj.arrType[0].arrType[1].value=value;
                    _self.$emit("handleChangeVal", value, _self.obj.arrType[0].arrType[1].name); //select 选中值     
                }
            }
        },_self.obj.arrType[0].arrType[1].label),
        h('div',{
            style:'float:right'
        },[
            h('el-button', {
                props: {
                    type:'text'
                },
                on: {
                    click: (value) => {
                        _self.$emit('HFCopyEl');
                    }
                }
            },_self.obj.arrType[0].arrType[2].label),
            h('el-button', {
                style:"margin-right:20px",
                props: {
                    type:'text'
                },
                on: {
                    click: () => {
                        _self.$emit('HFdelete');
                    }
                }
            },_self.obj.arrType[0].arrType[3].label)
        ])
    ];
  };
  
  