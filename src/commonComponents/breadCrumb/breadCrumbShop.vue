<template>
    <div class="navbar clearfix">
        <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                levelList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created(){
            this.getBreadcrumb()
        },
        methods:{
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                let matchPathName=this.$route.path.split('/').filter(item=>item);
                const first = matched[0];
                if(matchPathName.length===5){
                            let newPath=Object.assign([],matched[1].path.split('/'));
                            let title=null;
                            this.$router.options.routes.forEach(element => {
                                if(element.name==matched[0].name){
                                    element.children.forEach(e=>{
                                            if(e.name===newPath[4]){
                                                title=e.meta.title;
                                            }
                                    });
                                }
                            });
                            newPath.pop();
                            matched.splice (1,0,{
                                path:newPath.join('/'),
                                meta:{
                                    title:title
                                }
                            })
                            if(first&&(first.name.trim().toLocaleLowerCase() == 'shop_index'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'shop_shops'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'markting'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'bkmanagement'.toLocaleLowerCase()
                            )){
                                 matched.splice (0,1);
                            }
                       this.levelList = matched;
                }else if(matchPathName.length===6){
                            let newPath=Object.assign([],matched[1].path.split('/'));
                            let title=[];
                            this.$router.options.routes.forEach(element => {
                                if(element.name==matched[0].name){
                                    element.children.forEach(e=>{
                                            if(e.name===newPath[4]){
                                                title[0]=e.meta.title;
                                            }
                                            if(e.name===newPath[5]){
                                                title[1]=e.meta.title;
                                            }
                                    });
                                }
                            });
                            
                            let newPaths=[];
                            newPath.pop();
                            newPaths.push(newPath.join('/'));

                            matched.splice (1,0,
                            {
                                path:newPaths[1],
                                meta:{
                                    title:title[0]
                                }
                            },{
                                path:newPaths[0],
                                meta:{
                                    title:title[1]
                                }
                            })
                            if(first&&(first.name.trim().toLocaleLowerCase() == 'shop_index'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'shop_shops'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'markting'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'bkmanagement'.toLocaleLowerCase())){
                                 matched.splice (0,1);
                            }
                       this.levelList = matched;
                }else if(matchPathName.length===7){
                    let newPath=Object.assign([],matched[1].path.split('/'));
                            let title=[];
                            this.$router.options.routes.forEach(element => {
                                if(element.name==matched[0].name){
                                    element.children.forEach(e=>{
                                            if(e.name===newPath[4]){
                                                title[0]=e.meta.title;
                                            }
                                            if(e.name===newPath[5]){
                                                title[1]=e.meta.title;
                                            }
                                            if(e.name===newPath[6]){
                                                title[2]=e.meta.title;
                                            }
                                    });
                                }
                            });
                            
                            let newPaths=[];
                            newPath.pop();
                            newPaths.push(newPath.join('/'));

                            matched.splice (1,0,
                            {
                                path:newPaths[2],
                                meta:{
                                    title:title[0]
                                }
                            },{
                                path:newPaths[1],
                                meta:{
                                    title:title[1]
                                }
                            },{
                                path:newPaths[0],
                                meta:{
                                    title:title[2]
                                }
                            })
                            if(first&&(first.name.trim().toLocaleLowerCase() == 'shop_index'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'shop_shops'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'markting'.toLocaleLowerCase()
                            ||first.name.trim().toLocaleLowerCase() == 'bkmanagement'.toLocaleLowerCase())){
                                 matched.splice (0,1);
                            }
                       this.levelList = matched;
                }else if(first&&first.name.trim().toLocaleLowerCase() != 'shop_index'.toLocaleLowerCase()
                &&first.name.trim().toLocaleLowerCase() != 'shop_shops'.toLocaleLowerCase()
                &&first.name.trim().toLocaleLowerCase() != 'markting'.toLocaleLowerCase()
                &&first.name.trim().toLocaleLowerCase() != 'bkmanagement'.toLocaleLowerCase()){
                        this.levelList = matched;
                }else if(first&&(first.name.trim().toLocaleLowerCase() == 'shop_index'.toLocaleLowerCase()
                ||first.name.trim().toLocaleLowerCase() == 'shop_shops'.toLocaleLowerCase()
                ||first.name.trim().toLocaleLowerCase() == 'markting'.toLocaleLowerCase()
                ||first.name.trim().toLocaleLowerCase() == 'bkmanagement'.toLocaleLowerCase())){
                        matched.splice (0,1);
                        this.levelList=matched;
                }
                
            }
        }
    }
</script>
<style lang="scss" scoped>
.navbar{
    z-index: 1;
}
</style>


