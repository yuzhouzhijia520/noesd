<template>
  <vddl-draggable class="panel__body--item wf-nested-list"
    v-if="item.order||item.order===0"
    :draggable="item"
    :index="index"
    :disable-if="disable"
    :selected="selectedEvent"
    :wrapper="newList"
    v-bind:class="{'selected': selectedItem === item}"
    :dragstart="handleDragstart">
    <div class="panel padding" >
      <div class="panel__heading">
         <div :class="item.flagClick?'list-group-item list-group-selected':'list-group-item'" :style="item.component==='hideLine'?'':'min-height:30px'"   @click="handleComponentsClick(item)"  >
            <component 
                :is="item.component" 
                :comProps="item.props"  
                :text="item.name"
            >
            </component>
            <div class="list-group-item-div" 
                ref="itemButtonControler" 
                v-show="item.flagClick">
                <a  v-if="list.length>=2&&index!=0" @click="handleUpMove(item,index)">上移</a>
                <a  v-if="list.length>=2&&index!=list.length-1" @click="handleUpDown(item,index)">下移</a>
                <a  @click="handleDelete(item,index)">删除</a>
            </div>
        </div>
      </div>
      <vddl-list class="panel__body"
        v-if="item.columns"
        :list="item.columns"
        :disable-if="disable"
        :external-sources="true">
        <list v-for="(col, number) in item.columns"
          :key="col.id" :item="col"
          :list="item.columns"
          :index="number"
          :selected="selectedEvent"
          :selected-item="selectedItem"
          :disable="disable">
        </list>
      </vddl-list>
    </div>
  </vddl-draggable>
</template>

<script>
import swiper from '../swiper/swiper.vue'; //基础组件-轮播图
import banner from '../banner/banner.vue'; //基础组件-标题
import imageLabel from '../imageLabel/imageLabel.vue'; //基础组件-图片广告
import search from '../search/search.vue'; //基础组件-搜索框
import navigation from '../navigation/navigation.vue'; //基础组件-图文导航
import goods from '../goods/goods.vue'; //基础组件-商品
import cube from '../cube/cube.vue'; //基础组件-魔方
import hideLine from '../hideLine/hideLine.vue'; //基础组件-空白辅助线
import notice from '../notice/notice.vue'; //基础组件-公告
import videos from '../videos/videos.vue'; //基础组件-视频
import bargain from '../bargain/bargain.vue'; //基础组件-砍价
import spike from '../spike/spike.vue'; //基础组件-秒杀
import assemble from '../assemble/assemble.vue'; //基础组件-拼团
export default {
    name: 'list',
    props: ['item', 'list', 'index', 'selected', 'selectedItem', 'disable','dragstart'],
    data() {
        return {
            newList:[],
            componentsData:{},
            collapseComponent:{}
        }
    },
    components:{
            swiper,
            banner,
            navigation,
            imageLabel,
            search,
            goods,
            cube,
            hideLine,
            notice,
            videos,
            bargain,
            spike,
            assemble
    },
    created(){

    },
    mounted(){

    },
    methods: {
        handleDragstart(){
            this.$emit('dragstart',true);
        },
        selectedEvent(item){
            if (typeof(this.selected) === 'function') {
                this.selected(item);
            }
        },
        handleComponentsClick(el){
            let that=this;
            let order=el.order;
            //点击时获取赋值
            this.newList.forEach((item,i)=>{
                that.newList[i].flagClick=false;
                if(item.order===order){
                    that.newList[i].flagClick=true;
                    that.$emit('componentsChild',el.name, that.newList,order,item);
                }
            });
            this.$emit('handleList',this.newList);
        },
        handleDelete(element,index){
            //可视化设计器删除按钮删除事件
            let that=this;
            this.$confirm('此操作将删除该'+element.name+', 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.newList.splice(index,1);
                //给属性面板赋值
                that.componentsData={};
                //给操作面板赋值
                that.collapseComponent={};
                that.$emit('cleanObject', that.componentsData,that.collapseComponent);
                that.$emit('handleList',this.newList);
                that.$message({
                    type: 'success',
                    message: '删除成功!'
                });    
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除!'
                });          
            });
        
        },
        handleUpMove(element,index){
            //向上移动
            this.$nextTick(()=>{
                    this.newList[index]= this.newList[index-1];
                    this.newList[index-1]=element;
                    this.newList[index-1].flagClick=true;
                    this.$emit('handleList',this.newList);
            })
        },
        handleUpDown(element,index){
            //向下移动
            this.$nextTick(()=>{
                this.newList[index]= this.newList[index+1];
                this.newList[index+1]=element;
                    this.newList[index+1].flagClick=true;
                this.$emit('handleList',this.newList);
            })
        },
    },
    watch:{
        list:{
            immediate:true,
            handler(val,oldVal){
                 this.newList=JSON.parse(JSON.stringify(this.list));
            },
            deep:true
        }
    }
};
</script>

<style lang="scss" scoped>
.list-group-selected{
    border: 1px dashed #67bdff;
    border-radius: 2px;
}
.wf-nested-list{
    cursor: all-scroll;
    .list-group-item {
        cursor: move;
        position: relative;
        z-index:999;
        .list-group-item-div{
            position: absolute;
            background-color: rgba(0,0,0,0);
            bottom: 3px;
            right: 17px;
            flex-direction: row;
            z-index: 2;
            width: auto;
            a{
                display: inline-block;
                background-color: rgba(117, 116, 116, 0.83);
                width: 44px;
                height: 22px;
                color: #fff;
                margin-right: 3px;
                border-radius: 2px;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                &:hover{
                    background-color: rgba(93, 92, 92, 0.83);
                }
            }
        }
    }
}
.wf-nested-list:hover {
    box-shadow: 0 2px 13px 1px rgba(0,0,0,.15);
}
</style>
