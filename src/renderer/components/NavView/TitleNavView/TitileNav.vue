<template>
  <div class="topNavigation">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active="activeIndex"
    >
      <el-menu-item index="1">视频处理</el-menu-item>
      <el-menu-item index="2">流媒体处理</el-menu-item>
      <el-menu-item index="3">音频处理</el-menu-item>
      <el-menu-item index="4">图片处理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
};
</script>

<style>
.el-header,
.el-footer {
  padding: 0px !important;
  margin-left: 37%;
  /* background-color: #b3c0d1; */
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-main {
  background: rgb(248, 248, 248);
  padding: 0px !important;
  height: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 上切换栏掩藏border */
.el-menu.el-menu--horizontal {
  border: none !important
}
/* 左切换栏掩藏border */
.el-menu {
  border: none !important;
}
</style>
