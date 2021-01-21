<template>
  <div class="leftNavigation">
    <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">视频切割</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">视频合成</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">视频加水印</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">视频转格式</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // activeIndex: "1"
    };
  },
};
</script>

<style>
.el-menu-vertical-demo  {
    height: 100%;
}
.leftNavigation {
    height: 100%;
}
</style>
