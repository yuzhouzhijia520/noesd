export default (_self, h,item,i) => {
    return [
      h("el-checkbox", {
          style:"margin-left: -25px;float:left;margin-right: 10px;"
      },[h("el-input", {
        style:"min-width:465px;",
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
            // h('el-button', {
            //     style:'padding-top:8px;padding-bottom:8px',
            //     props: {
            //         type:'text'
            //     },
            //     on: {
            //         click: (value) => {
            //             _self.$emit('HFCopyCh',i);
            //         }
            //     }
            // },item.option[0].label),
            h('el-button', {
                style:"margin-right:20px;padding-top:8px;padding-bottom:8px",
                props: {
                    type:'text'
                },
                on: {
                    click: () => {
                        _self.$emit('HFDeleteCh',i);
                    }
                }
            },item.option[0].label)
        ])
    ];
};
  