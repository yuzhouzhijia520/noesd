  
  /**
   * eltype 
   * 1表示多个组件
   */
  export const selectCBoxConf={
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
                label: '多选题',
                key:1,//多选
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
        placeholder: '请输入标题',
        // 最大长度
        maxlength:80,
        value: '',
      },
      {
        eltype:2,
        type: 'addradio',
        // 是否可配置
        config: true,
        label: '选项',
        arrType:[
          {
            label: '选项',
          },
          {
            eltype:2,
            // 对应数据库内类型
            type: 'button',
            label: '添加选项',
            name:'addradioP',
            arrType:[
                {
                    // 对应数据库内类型
                    type: 'checkBoxInput',
                    // 是否可配置
                    config: true,
                    // 控件左侧label内容
                    label: '',
                    name: 'inputRIC',
                    placeholder: '请在这里编辑选项内容',
                    // 最大长度
                    maxlength:35,
                    value: '',
                    option:[
                        // {
                        //     // 对应数据库内类型
                        //     type: 'button',
                        //     label: '复制'
                        // },
                        {
                            // 对应数据库内类型
                            type: 'button',
                            label: '删除'
                        }
                    ]
                }
            ]
          },{
            eltype:2,
            // 对应数据库内类型
            type: 'button',
            label: '添加填空选项',
            name:'addradioC',
            arrType:[]
          }
        ]
      },
      ]
  };