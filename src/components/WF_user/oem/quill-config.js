// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    [{'clean':'源码编辑'}],
    ['link', 'image', 'video'],
    ['sourceEditor']     //新添加的工具
  ];
  const handlers = {
    shadeBox:null,
    sourceEditor: function(){     //添加工具方法
        const container = this.container;
        const firstChild = container.nextElementSibling.firstChild;
        if(!this.shadeBox){
          let shadeBox = this.shadeBox = document.createElement('div');
          shadeBox.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer';
          shadeBox.addEventListener('click',function(){
            this.style.display = 'none';
            firstChild.innerHTML = firstChild.innerText.trim();
          },false);
          container.appendChild(shadeBox);
          firstChild.innerText = firstChild.innerHTML;
        }else {
          this.shadeBox.style.display = 'block';
          firstChild.innerText = firstChild.innerHTML;
        }
    }
  };
   
  export default {
    placeholder:'请输入信息',
    theme: 'snow',  // 主题
    modules: {
      toolbar: {
        container: toolOptions,  // 工具栏选项
        handlers: handlers  // 事件重写
      }
    },
    initButton:function(){      //在使用的页面中初始化按钮样式
      const sourceEditorButton = document.querySelector('.ql-sourceEditor');
      sourceEditorButton.classList.add('el-icon-edit-outline');
      sourceEditorButton.title = "源码编辑";
    }
  };