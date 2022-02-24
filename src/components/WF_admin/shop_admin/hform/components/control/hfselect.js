export default (_self, h) => {
    return [
        h("el-select", {
            props: {
                placeholder:_self.obj.arrType[0].arrType[0].placeholder||'',                    
                value: _self.obj.arrType[0].arrType[0].value||'',//默认值    
                popperClass:'popperClassResOut',//样式
                size:'mini'                
            },                               
            on: {
                'input': value => {
                    _self.obj.arrType[0].arrType[0].value = value;
                    _self.$emit("handleChangeVal", value, _self.obj.arrType[0].arrType[0].name); //select 选中值                        
                }                                           
            }
        },
        _self.obj.arrType[0].arrType[0].optionTypes.map((item)=>{//这个数组需要在data中定义,里面是一个个对象,每个对象里面应当包含value属性(因为要用到)
            return h('el-option', {
                props:{
                    value:item.value||'',
                    label:item.name||'',       
                }
            }, item.name)
        })),
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
  
  
//   /**
//    * eltype 0 表示单个组件
//    * 1表示多个组件
//    */
//   export let inputConf ={
//         // 对应数据库内类型
//         type: 'hfselect',
//         // 是否可配置
//         config: true,
//         // 控件左侧label内容
//         label: '单行填空',
//         placeholder:'请选择数据类型',
//         name: 'hfselect',
//         value: '',
//         optionTypes:[
//             {
//                 value:'1',
//                 name:'数字'
//             },
//             {
//                 value:'2',
//                 name:'字母'
//             }
//         ],
//         checkboxLabel:'必填',
//         checkboxValue:false
//     }
  