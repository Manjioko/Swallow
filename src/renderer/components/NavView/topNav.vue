<template>
  <div class="topNavigation">
    <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
      <el-menu-item index="1">视频处理</el-menu-item>
      <el-menu-item index="2">流媒体处理</el-menu-item>
      <el-menu-item index="3">音频处理</el-menu-item>
      <el-menu-item index="4">图片处理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          activeIndex: "1"
      }
    }
  }
</script>

<style>

</style>
