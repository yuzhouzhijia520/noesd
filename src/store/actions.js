//给action注册事件处理函数，动态修改vuex的stote中的状态或数据
import {getOemDataList} from '../server/adapter';
export const loadData=({ commit, state })=> {
    const oemData =getOemDataList();
    oemData.then(context => {
            if(context){
                if(context.data.code===403003){
                    return;
                }else{
                    return　commit('serverList', context.data)
                }
               
            }else{
                return;
            }
    　　}
    ).catch(err=>{
        return err;
    })
}