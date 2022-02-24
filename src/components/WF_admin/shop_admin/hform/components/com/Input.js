  
  /**
   * eltype 
   * 1表示多个组件
   */
  export const inputConf={
    eltype:1,
    type: 'hfselect',
    arrType:[
      {
        eltype:1,
        type: 'hfselect',
        // 是否可配置
        config: true,
        arrType:[
          {
            // 对应数据库内类型
            // type: 'hfselect',
            
            // 控件左侧label内容
            label: '单行填空',
            placeholder:'请选择数据类型',
            name: 'hfselect',
            value: '',
            optionTypes:[
                {
                    value:'0',
                    name:'数字'
                },
                {
                    value:'1',
                    name:'字母'
                },
                {
                    value:'2',
                    name:'数字+字母'
                },
                {
                    value:'3',
                    name:'文字'
                },
                {
                    value:'4',
                    name:'日期'
                },
                {
                    value:'5',
                    name:'时间'
                },
                {
                    value:'6',
                    name:'日期+时间'
                },
                {
                    value:'7',
                    name:'邮箱'
                }
            ]
          },{
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
        placeholder: '请输入标题',
        // 最大长度
        maxlength:80,
        value: '',
      },
      {
        // 对应数据库内类型
        type: 'placeInput',
        // 是否可配置
        config: true,
        // 控件左侧label内容
        label: '提示语:',
        name: 'inputP',
        placeholder: '请输入提示语',
        // 最大长度
        maxlength:12,
        value: '',
      }]
  };