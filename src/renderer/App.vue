<template>
  <div id="app" ref="app_select_frame">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "swallow",
  mounted: function () {
    this.$refs.app_select_frame.ondragover = (e) => {
      e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    };
    this.$refs.app_select_frame.ondrop = (e) => {
      e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    };
  },
};
</script>

<style>
/* CSS */
/* html,body {
    margin:0px
    
  } */
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
