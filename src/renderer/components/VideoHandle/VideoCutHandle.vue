<template>
  <div class="VideoCutHandle" ref="select_frame" ondragstart="return false">
    <!-- <div>VideoCutHandle</div> -->
    <div class="VideoCutHandle">
      <video
        :src="videoSourcePath"
        :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      ></video>
    </div>
  </div>
</template>

<script>
const fs = window.require("fs");

export default {
  data() {
    return {
      videoSourcePath: "",
      videoSourceName: "",
      videoWidth: 300,
      videoHeight: 300,
    };
  },
  methods: {},
  mounted: function () {
    this.$refs.select_frame.ondragleave = (e) => {
      e.preventDefault(); // 阻止离开时的浏览器默认行为
    };
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault(); // 阻止拖放后的浏览器默认行为
      const data = e.dataTransfer.files[0]; // 获取文件对象
      if (data.length < 1) {
        return; // 检测是否有文件拖拽到页面
      }
      console.log(data);
      this.videoSourcePath = data.path;
      this.videoSourceName = data.name;
      let buf = fs.readFileSync(this.videoSourcePath);
      let uint8Buffer = Uint8Array.from(buf);
      let bolb = new Blob([uint8Buffer]);
      this.videoSourcePath = window.URL.createObjectURL(bolb);
      // console.log(fs.readFileSync(this.videoSourcePath))
      // this.upload(data); //上传文件的方法
    };
    this.$refs.select_frame.ondragenter = (e) => {
      e.preventDefault(); // 阻止拖入时的浏览器默认行为
      this.$refs.select_frame.border = "2px dashed red";
    };
    this.$refs.select_frame.ondragover = (e) => {
      e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    };
  },
};
</script>

<style>
.VideoCutHandle {
  width: 600px;
  /* height: 400px; */

  /* padding: 100px; */
}
.dragFileClass {
  height: 400px;
  width: 600px;
  background: darkorange;
}
</style>
