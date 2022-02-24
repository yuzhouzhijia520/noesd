export default (_self, h) => {
  return [
    h("el-input", {
      style:"width:95%;",
      props: {
        value: _self.obj.arrType[1].value||'',
        size:'mini'
      },
      attrs: {
        maxlength: parseInt(_self.obj.arrType[1].maxlength) || 20,
        placeholder: _self.obj.arrType[1].placeholder || "请输入",
      },
      on: {
        input: function(val) {
            _self.obj.arrType[1].value = event.currentTarget.value;
            _self.$emit('handleChangeVal', event.currentTarget.value,_self.obj.arrType[1].name);
        }
      }
    })
  ];
};


// /**
//  * eltype 0 表示单个组件
//  * 1表示多个组件
//  */
// export let inputConf ={
//   // 对应数据库内类型
//   type: 'titleInput',
//   // 是否可配置
//   config: true,
//   // 控件左侧label内容
//   label: '标题',
//   name: 'inputN',
//   placeholder: '请输入标题',
//   // 最大长度
//   maxlength:80,
//   value: '',
// }
