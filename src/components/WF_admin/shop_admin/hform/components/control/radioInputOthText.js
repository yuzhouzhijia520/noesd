export default (_self, h,item,i) => {
    return [
        h("span", {},'提示语'),
        h("el-input", {
          style:"width:45%;margin-left:5px;padding-right:30px;",
          props: {
            value:item.value ||'',
            size:'mini'
          },
          attrs: {
            maxlength: parseInt(item.maxlength) || 20,
            placeholder: item.placeholder || "请输入",
          },
          on: {
              'input': function(val) {
                  // item.value = event.currentTarget.value;
                  _self.$emit('handleChangeVal', event.currentTarget.value,item.name,i);
              }
          }
        })
    ];
};
  