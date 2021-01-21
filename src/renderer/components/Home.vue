<template>
  <div id="Home">
    <!-- <div>
      <topNav />
    </div>
    <div>
      <leftNav />
    </div> -->
    <el-container>
      <el-header>
        <topNav />
      </el-header>
      <el-container>
        <el-aside width="150px">
          <leftNav />
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import topNav from "./NavView/topNav";
import leftNav from "./NavView/leftNav";

export default {
  name: "topNavigation",
  components: { topNav, leftNav },
  methods: {},
  mounted: function () {
    // this.$router.push("Home")
  },
};
</script>

<style>
.el-header,
.el-footer {
  padding: 0px !important;
  margin-left: 150px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
#Home{
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
