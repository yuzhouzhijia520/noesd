  
  /**
   * eltype 
   * 1表示多个组件
   */
  export const addressConf={
    eltype:1,
    type: 'hfqusselect',
    arrType:[
      {
        eltype:1,
        type: 'hfqusselect',
        // 是否可配置
        config: true,
        arrType:[
            {
                // 对应数据库内类型
                // type: 'hfselect',
                
                // 控件左侧label内容
                label: '地址',
                key:3,//地址
                name: 'hfqusselect'
            },
          {
            // 对应数据库内类型
            type: 'check',
            label: '必填',
            name: 'requireCheck',
            value: false,
          },{
            // 对应数据库内类型
            type: 'button',
            label: '复制'
          },{
            // 对应数据库内类型
            type: 'button',
            label: '删除'
          }
        ]
      },
      {
        // 对应数据库内类型
        type: 'titleInput',
        // 是否可配置
        config: true,
        // 控件左侧label内容
        label: '标题:',
        name: 'inputT',
        placeholder: '请在这里编辑标题',
        // 最大长度
        maxlength:80,
        value: '',
      },
      {
        // 对应数据库内类型
        type: 'dropAddr',
        // 是否可配置
        config: true,
        // 控件左侧label内容
        label: '详细地址:',
        name: 'addr',
        placeholder: '请选择省市区',
        // 最大长度
        maxlength:80,
        value: '',
      },
      {
        // 对应数据库内类型
        type: 'addressText',
        // 是否可配置
        config: true,
        // 控件左侧label内容
        label: '',
        name: 'addressTextName',
        placeholder: '请填写详细地址',
        // 最大长度
        maxlength:80,
        value: '',
      }
      ]
  };