<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
        <span>1111111111111111</span>
        <el-breadcrumb-item v-for="(item,index) in levelList"  :key="item.path">
            {{item.meta.name}}
            <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
            <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const { params } = this.$route
      let that=this;
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
    //   const first = matched[0]
    //   if (first &&first.name.trim().toLocaleLowerCase() !== 'shop'.toLocaleLowerCase()) {
        // matched = [{ path: '/wf/admin/shop', meta: { title: '概览' }}].concat(matched)
    //   }
      this.levelList = matched;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
