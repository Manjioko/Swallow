<template>
  <div class="VideoCutHandle" ref="select_frame" ondragstart="return false">
    <!-- <div>VideoCutHandle</div> -->
    <div class="VideoCutHandle_video_parent">
      <video
        v-if="videoratio == 16 / 9"
        :src="videoSourcePath"
        class="videoCutVideoClass"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
        width="800px"
        height="450px"
        @dblclick="cancelsrc"
      ></video>
      <video
        v-else-if="videoratio == 3 / 4"
        :src="videoSourcePath"
        class="videoCutVideoClass"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
        width="360px"
        height="480px"
        @dblclick="cancelsrc"
      ></video>
      <video
        v-else-if="videoratio == 4 / 3"
        :src="videoSourcePath"
        class="videoCutVideoClass"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
        width="480px"
        height="360px"
        @dblclick="cancelsrc"
      ></video>
      <div v-else class="videoCutVideoClass firstTextClass">
        <div class="dragTipClass">请将视频拖放到此处</div>
      </div>
    </div>
  </div>
</template>

<script>
const fs = window.require("fs");
const { spawn, exec } = window.require("child_process");
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";

let ffmpegPath = ffmpegStatic.path;
let ffprobePath = ffprobeStatic.path;

// 设置 fluent-ffmpeg 的 ffmpeg 、ffprobe路径
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobePath);

export default {
  data() {
    return {
      videoSourcePath: "",
      videoSourceName: "",
      videoWidth: 300,
      videoHeight: 300,
      videoratio: 0,
    };
  },
  methods: {
    cancelsrc(e) {
      // console.log(e.target)
      e.target.src = "";
      this.videoratio = 0;
    },
  },
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
      // this.videoSourcePath = data.path;
      this.videoSourceName = data.name;
      // let buf = fs.readFileSync(this.videoSourcePath);
      // let uint8Buffer = Uint8Array.from(buf);
      // let bolb = new Blob([uint8Buffer]);
      // this.videoSourcePath = window.URL.createObjectURL(bolb);
      // ffmpeg(this.videoSourcePath)
      //   .videoCodec("libx264")
      //   .output(savePath + "/big.mov")
      //   // .audioCodec("copy")
      //   .size("300x300")
      //   .on("error", function (err) {
      //     // console.log(this)
      //     console.log("An error occurred: " + err.message);
      //   })
      //   .on("end", function () {
      //     console.log("Processing finished !");
      //   })
      //   .run();
      // console.log(fs.readFileSync(this.videoSourcePath))
      // this.upload(data); //上传文件的方法
      // console.log(this.videoSourcePath);
      let that = this;
      ffmpeg.ffprobe(data.path, function (err, metadata) {
        if (err) {
          console.log(err);
        }
        that.videoratio =
          metadata.streams[0].width / metadata.streams[0].height;
        that.videoSourcePath = data.path;
        exec(ffmpegStatic+' -i '+data.path+' -filter:v "crop=80:60:200:100" -c:a copy C:\\Users\\devp2\\Desktop\\out.mp4', (error, stdout, stderr) => {
          if (error) {
            console.error(`执行的错误: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });
      });
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
  height: 100%;
  /* width: 600px; */
  position: relative;

  /* height: 400px; */

  /* padding: 100px; */
}
.VideoCutHandle_video_parent {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
}
.dragFileClass {
  height: 400px;
  width: 600px;
  background: darkorange;
}
/* .videoCutVideoClass {
  max-height: 500px;
} */
.firstTextClass {
  width: 800px;
  height: 450px;
  text-align: center;
  background: rgba(251, 81, 0, 0.42);
}
.dragTipClass {
  padding-top: 26%;
  font-size: 50px;
  color: white;
}
</style>
