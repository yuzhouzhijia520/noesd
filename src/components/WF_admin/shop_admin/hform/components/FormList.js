import { inputConf } from "./com/Input";
import { textareaConf } from "./com/textarea";
import { selectConf } from "./com/select";
import { selectCBoxConf } from "./com/selectCBox";
import { addressConf } from "./com/address";
const formList = {
  input: inputConf,
  textarea: textareaConf,
  select: selectConf,
  selectCBox:selectCBoxConf,
  address:addressConf
};
const newformList=JSON.parse(JSON.stringify(formList));
let list_arr = [];
Object.keys(newformList).forEach((item)=>{
  list_arr.push({
    ele: item,
    obj: newformList[item]
  })
})
const newList=JSON.parse(JSON.stringify(list_arr));
export default  newList;
