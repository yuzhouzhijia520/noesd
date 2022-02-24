export default (_self, h) => {
    return [
        h('el-button', {
            props: {
                type:'text'
            },
            on: {
                click: (value) => {

                    _self.$emit('handleChangeVal','addOption','addOption');
                     
                }
            }
        },_self.obj.arrType[2].arrType[1].label),
        h('el-button', {
            style:"margin-right:20px",
            props: {
                type:'text'
            },
            on: {
                click: () => {
                    _self.$emit('handleChangeVal','addOtherOption','addOtherOption');
                }
            }
        },_self.obj.arrType[2].arrType[2].label)
    ];
};
  