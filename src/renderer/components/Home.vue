<template>
  <div id="Home">
    <!-- <div>
      <TitileNav />
    </div>
    <div>
      <VideoCutNav />
    </div> -->
    <el-container>
      <el-header>
        <TitileNav />
      </el-header>
      <el-container>
        <el-aside width="130px">
          <VideoCutNav />
        </el-aside>
        <el-container>
          <el-main>
            <VideoCut v-if="mainViewSwitch == '1'" />
            <VideoCombine v-if="mainViewSwitch == '2'" />
            <VideoWaterMark v-if="mainViewSwitch == '3'" />
            <VideoConvert v-if="mainViewSwitch == '4'" />
          </el-main>
        </el-container>
      </el-container>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import TitileNav from "./NavView/TitleNavView/TitileNav";
import VideoCutNav from "./NavView/SubNavView/VideoCutNav";
import VideoCombine from "./VideoHandle/VideoCombineHandle"
import VideoCut from "./VideoHandle/VideoCutHandle"
import VideoConvert from "./VideoHandle/VideoConvertHandle"
import VideoWaterMark from "./VideoHandle/VideoWaterMarkHandle"

export default {
  name: "TitileNavigation",
  components: { TitileNav, VideoCutNav, VideoCombine, VideoCut, VideoConvert, VideoWaterMark },
  data() {
    return {
      mainViewSwitch: "1"
    };
  },
  methods: {},
  watch: {
    viewSwitch: function () {
      // console.log(this.viewSwitch);
      this.mainViewSwitch = this.viewSwitch;
    },
  },
  computed: {
    viewSwitch: function () {
      return this.$store.state.Counter.viewSwitch;
    },
  },
  mounted: function () {
    // this.$router.push("Home")
  },
};
</script>

<style>
#Home {
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
