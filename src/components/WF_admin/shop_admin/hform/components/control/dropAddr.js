export default (_self, h) => {
    return [
      h("el-select", {
        style:"width:95%;",
        props: {
            size:'mini',
            disabled:true,
            placeholder:_self.obj.arrType[2].placeholder || "请选择",
        }
      })
    ];
  };
  
  