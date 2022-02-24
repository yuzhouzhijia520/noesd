export default (_self, h) => {
    return [
      h("el-input", {
        style:"width:95%;",
        props: {
            disabled:true,
            size:'mini'
        },
        attrs: {
            placeholder: _self.obj.arrType[3].placeholder || "请选择",
        },
      })
    ];
  };
  