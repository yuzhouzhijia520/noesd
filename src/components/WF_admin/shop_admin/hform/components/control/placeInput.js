export default (_self, h) => {
    return [
      h("el-input", {
        style:"width:95%;",
        props: {
          value:_self.obj.arrType[2].value ||'',
          size:'mini'
        },
        attrs: {
          maxlength: parseInt(_self.obj.arrType[2].maxlength) || 20,
          placeholder: _self.obj.arrType[2].placeholder || "请输入",
        },
        on: {
            'input': function(val) {
            _self.obj.arrType[2].value = event.currentTarget.value;
            _self.$emit('handleChangeVal', event.currentTarget.value,_self.obj.arrType[2].name)
          }
        }
      })
    ];
  };
  
  
//   /**
//    * eltype 0 表示单个组件
//    * 1表示多个组件
//    */
//   export let inputConf ={
//       // 对应数据库内类型
//       type: 'placeInput',
//       // 是否可配置
//       config: true,
//       // 控件左侧label内容
//       label: '提示语',
//       name: 'inputP',
//       placeholder: '请输入提示语',
//       // 最大长度
//       maxlength:12,
//       value: '',
//     }
  