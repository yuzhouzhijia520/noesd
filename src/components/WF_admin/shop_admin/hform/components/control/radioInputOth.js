export default (_self, h,item,i) => {
    return [
      h("el-radio", {
          style:"width:50%;margin-left: -25px;float:left;"
      },[h("el-input", {
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
      })]),h('div',{},[
            h('el-button', {
                style:"padding-top:8px;padding-bottom:8px",
                props: {
                    type:'text'
                },
                on: {
                    click: () => {
                        _self.$emit('HFDeleteOth');
                    }
                }
            },item.option[0].label)
        ])
    ];
};
  