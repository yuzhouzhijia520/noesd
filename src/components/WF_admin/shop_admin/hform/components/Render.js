import placeInput from './control/placeInput';
import titleInput from './control/titleInput';
import hfselect from './control/hfselect';
import hftextarea from './control/hftextarea';
import hfqusselect from './control/hfqusselect';
import radioInput from './control/radioInput';
import radioInputOth from './control/radioInputOth';
import radioInputOthText from './control/radioInputOthText';
import checkBoxInput from './control/checkBoxInput';
import checkInputOth from './control/checkInputOth';
import addradio from './control/addradio';
import dropAddr from './control/dropAddr';
import addressText from './control/addressText';

const form_item = {
  titleInput,
  placeInput,
  hfselect,
  hftextarea,
  hfqusselect,
  radioInput,
  radioInputOth,
  radioInputOthText,
  checkBoxInput,
  checkInputOth,
  addradio,
  dropAddr,
  addressText
};

export default {
  name: 'renders',
  render(h) {
    if(this.obj.eltype===1){
      let elform=[];
      this.obj.arrType.forEach((item,index)=>{
        if(item.eltype===1){
            elform.push(
              h('el-form-item', {
                class:index===0?'hf-header':'',
                props: {
                  label: item.arrType[0].label 
                }
              }, form_item[item.type](this, h))
            )
        }else if(item.eltype===2){
          elform.push(
            h('el-form-item', {
              class:index===0?'hf-header':'',
              props: {
                label: item.arrType[0].label 
              }
            }, form_item[item.type](this, h))
          );
          item.arrType[1].arrType.forEach((item1,i)=>{
            elform.push(
              h('el-form-item', {
              }, form_item[item1.type](this, h,item1,i))
            )
          })
          item.arrType[2].arrType.forEach((item1,i)=>{
            elform.push(
              h('el-form-item', {
              }, form_item[item1.type](this, h,item1,i))
            )
          })
        }else{
          elform.push(
            h('el-form-item', {
              props: {
                label: item.label 
              }
            }, form_item[item.type](this, h))
          )
        }
      })
      return h('div', elform);
    }else{
      return h('el-form-item', {
        props: {
          label: this.obj.label 
        }
      }, form_item[this.ele](this, h));
    }
    
  },
  props: {
    ele: {
      type: String,
      default: "input"
    },
    obj: [Object, Array]
  }
}
