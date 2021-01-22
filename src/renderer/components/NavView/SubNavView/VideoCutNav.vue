<template>
  <div class="leftNavigation">
    <el-menu class="el-menu-vertical-demo" @select="handleSelect" :default-active="activeIndex">
        <el-menu-item index="1">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">视频切割</span>
      </el-menu-item>
      <el-menu-item index="2">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">视频合成</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <!-- <i class="el-icon-document"></i> -->
        <span slot="title">视频加水印</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <!-- <i class="el-icon-setting"></i> -->
        <span slot="title">视频转格式</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data() {
    return {
        activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch(key) {
        case "1":
          this.$store.commit("SubNavViewSwitchFn","1");
          break;
        case "2":
          this.$store.commit("SubNavViewSwitchFn","2");
          break;
        case "3":
          this.$store.commit("SubNavViewSwitchFn","3");
          break;
        case "4":
          this.$store.commit("SubNavViewSwitchFn","4");
          break; 
      }
    }
  }
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
