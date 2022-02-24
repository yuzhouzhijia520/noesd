export const setPageProps=(state, param)=> {
    state.setPageProps = param.setPageProps
    return state
}
export const serverList=(state, param)=> {
    state.serverList = param
}
export const getShowRole=(state,item)=>{
    state.showRole=item.showRole
}
export const getImageUrl=(state,item)=>{
    state.imageUrl=item.imageUrl
}
export const getProName=(state,item)=>{
    state.proName=item.proName
}
export const getPublishStatus=(state,item)=>{
    state.publishStatus=item.publishStatus
}
export const getProVersion=(state,item)=>{
    state.proVersion=item.proVersion
    state.type_id=item.type_id
    return state
}
export const getFromDataFare=(state,item)=>{
    state.fromDataFare=item.fromDataFare
}
export const getFromDataAllFare=(state,item)=>{
    state.fromDataAllFare=item.fromDataAllFare
}
export const getSku_info=(state,item)=>{
    state.skuInfo.spec_name=item.spec_name;
    state.skuInfo.spec_son_name=item.spec_son_name;
    state.skuInfo.sku_info=item.sku_info;
    return state;
}
export const getSkuInfoFlag=(state,item)=>{
    state.skuInfoFlag=item.skuInfoFlag
}
export const getSkuEditFlag=(state,item)=>{
    state.skuEditFlag=item.skuEditFlag
}
export const getWeightMust=(state,item)=>{
    state.weightMust=item.weightMust
}
export const getMember_type=(state,item)=>{
    state.member_type=item.member_type
}
export const getCouponList=(state,item)=>{
    state.couponList=item.couponList
}
export const getCouponNotList=(state,item)=>{
    state.couponNotList=item.couponNotList
}
