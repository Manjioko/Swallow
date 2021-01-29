<template>
  <div class="VideoCutHandle" ref="select_frame" ondragstart="return false">
    <!-- <div>VideoCutHandle</div> -->
    <div class="VideoCutHandle_video_parent">
      <div
        class="vdrParentClass"
        :class="{
          Class16_9: videoratio == 16 / 9,
          Class4_3: videoratio == 4 / 3,
          Class3_4: videoratio == 3 / 4,
        }"
      >
        <video
          ref="video16_9"
          :src="videoSourcePath"
          class="videoCutVideoClass"
          :width="
            videoratio == 16 / 9
              ? '800px'
              : videoratio == 3 / 4
              ? '360px'
              : videoratio == 4 / 3
              ? '480px'
              : '0px'
          "
          :height="
            videoratio == 16 / 9
              ? '450px'
              : videoratio == 3 / 4
              ? '480px'
              : videoratio == 4 / 3
              ? '360px'
              : '0px'
          "
          @dblclick="cancelsrc"
          @click="startToPaly"
          @canplay="getVidDur"
          @loadeddata="handleLoadedData"
          @timeupdate="handleTimeUpate"
        ></video>
        <div v-if="!videoratio" class="videoCutVideoClass firstTextClass" style="cursor: pointer">
          <div class="dragTipClass" @click="selectVideoFile">选择/拖放 <span :style="{color: '#ff0000'}">视频</span> 到此处</div>
        </div>
        <vdr
          :parent="true"
          :x="x"
          :y="y"
          :w="w"
          :h="h"
          @dragging="onDrag"
          @resizing="onResize"
          v-if="videoratio"
        >
        </vdr>
      </div>
      <div class="block">
        <el-slider
          v-model="sliderValue"
          :max="videoDuration"
          range
          :show-tooltip="true"
          :step="0.1"
        >
        </el-slider>
        <span class="targetTimeLeft">-{{ sliderValue[0] }}s</span>
        <span class="targetTimeRight">-{{ sliderValue[1] }}s</span>
      </div>
      <div class="cutBtnClass">
        <el-button type="primary" @click="cutVideoClickFn" :loading="iscut"
          >剪切视频</el-button
        >
        <el-button @click="startToPaly">播放/暂停</el-button>
        <el-button type="danger" @click="cancelsrc">清空视频</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ffm from "../../../utils/ffmpegHandle";
const ffmpeg = new ffm();
import { remote } from "electron";

export default {
  data() {
    return {
      videoSourcePath: "",
      videoratio: 0,
      frameWidth: 0,
      frameHeight: 0,
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      cutData: [100, 100, 100, 100],
      sliderValue: [0, 0],
      videoDuration: 0,
      isPlay: false,
      videoName: "",
      iscut: false,
    };
  },
  watch: {
    // 拉动滑块时视频要快进到相应的帧
    sliderValue: function () {
      if (this.sliderValue[0] && !this.isPlay) {
        this.$refs.video16_9.currentTime = this.sliderValue[0];
      }
    },
  },
  methods: {
    async cutVideoClickFn() {
      let savePath;
      await new Promise((resolve, reject) => {
        if (this.videoSourcePath) {
          remote.dialog.showOpenDialog(
            {
              buttonLabel: "保存",
              properties: ["openDirectory"],
            },
            (filename) => {
              if (filename) {
                // this.savePath = filename[0];
                // console.log(this.savePath);
                resolve(filename[0]);
                savePath = filename[0];
              } else {
                reject("用户取消");
              }
            }
          );
        } else {
          this.$message("视频文件缺失");
          // reject("视频文件缺失");
        }
      });
      if (savePath) {
        ffmpeg.cutVideo(
          this.videoSourcePath,
          this.cutData,
          this.sliderValue,
          this.videoName,
          savePath
        );
      }
    },
    selectVideoFile() {
      remote.dialog.showOpenDialog(
            {
              buttonLabel: "选择视频文件",
              properties: ["openFile"],
            },
            (filename) => {
              // console.log(filename)
              if (filename && filename[0].endsWith(".mp4")) {
                // this.savePath = filename[0];
                // console.log(this.savePath);
                // resolve(filename[0]);
                this.videoSourcePath = filename[0];
              } else {
                this.$message("视频文件格式暂不支持")
              }
            }
          );
    },
    // 获取视频时常
    getVidDur() {
      // console.log("视频时常: ", this.$refs.video16_9.duration);
      if (this.$refs.video16_9.duration) {
        if (!this.sliderValue[1]) {
          this.sliderValue[1] = [this.$refs.video16_9.duration];
        }
        this.videoDuration = this.$refs.video16_9.duration;
      }
    },
    // 取消所选视频
    cancelsrc(e) {
      e.target.src = "";
      this.videoSourcePath = "";
      this.videoratio = 0;
      this.cutData = [100, 100, 100, 100];
      this.sliderValue = [0, 0];
    },
    // 播放或者暂停视频
    startToPaly() {
      // 播放源一定要存在才能进行判断
      if (this.videoSourcePath) {
        if (this.$refs.video16_9.paused) {
          this.isPlay = true;
          this.$refs.video16_9.play();
        } else {
          this.isPlay = false;
          this.$refs.video16_9.pause();
        }
      }
    },
    // 处理播放时间变化
    handleTimeUpate() {
      // 仅在播放状态,滑块才跟着视频时间变化改变,暂停状态这里不执行
      if (this.isPlay) {
        // console.log(this.sliderValue);
        let [startTime, endTime] = this.sliderValue;
        // 滑块两端重叠时暂停播放
        if (Math.ceil(startTime) < Math.ceil(endTime)) {
          this.sliderValue = [
            this.$refs.video16_9.currentTime,
            this.sliderValue[1],
          ];
        } else {
          this.isPlay = false;
          this.$refs.video16_9.pause();
        }
      }
    },
    // 处理元数据加载
    handleLoadedData(event) {
      this.frameWidth = event.target.videoWidth;
      this.frameHeight = event.target.videoHeight;
      this.videoName = event.target.src.split("/").pop();
      // console.log(event.target.src.split("/").pop());
      // 加入切割的初始值
      this.cutData = [100, 100, 100, 100];

      // 判断是否在合法的比例范围内
      let ratio = this.frameWidth / this.frameHeight;
      let isLegal = ratio == 16 / 9 || ratio == 4 / 3 || ratio == 3 / 4;
      if (isLegal) {
        this.videoratio = ratio;
      } else {
        this.videoSourcePath = "";
        this.$message("视频尺寸不合规,请重新选择");
      }
    },
    // vdr拖动时触发
    onDrag(x, y) {
      this.x = x;
      this.y = y;
      if (this.videoratio == 16 / 9) {
        // 按照帧宽度比例的x轴
        this.cutData[2] = (x / 800) * this.frameWidth;
        this.cutData[3] = (y / 450) * this.frameHeight;
      } else if (this.videoratio == 4 / 3) {
        // 按照帧宽度比例的x轴
        this.cutData[2] = (x / 480) * this.frameWidth;
        this.cutData[3] = (y / 360) * this.frameHeight;
      } else if (this.videoratio == 3 / 4) {
        this.cutData[2] = (x / 360) * this.frameWidth;
        this.cutData[3] = (y / 480) * this.frameHeight;
      } else {
        this.cutData[2] = 100;
        this.cutData[3] = 100;
      }
    },
    // vdr 大小改变时触发
    onResize(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.h = h;
      this.w = w;

      if (this.videoratio == 16 / 9) {
        this.cutData[2] = (x / 800) * this.frameWidth;
        this.cutData[3] = (y / 450) * this.frameHeight;
        this.cutData[0] = (w / 800) * this.frameWidth;
        this.cutData[1] = (h / 450) * this.frameHeight;
      } else if (this.videoratio == 4 / 3) {
        this.cutData[2] = (x / 480) * this.frameWidth;
        this.cutData[3] = (y / 360) * this.frameHeight;
        this.cutData[0] = (w / 480) * this.frameWidth;
        this.cutData[1] = (h / 360) * this.frameHeight;
      } else if (this.videoratio == 3 / 4) {
        this.cutData[2] = (x / 360) * this.frameWidth;
        this.cutData[3] = (y / 480) * this.frameHeight;
        this.cutData[0] = (w / 360) * this.frameWidth;
        this.cutData[1] = (h / 480) * this.frameHeight;
      } else {
        this.cutData[2] = 100;
        this.cutData[3] = 100;
        this.cutData[0] = 100;
        this.cutData[1] = 100;
      }
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

      if (!this.videoSourcePath && data.path.endsWith(".mp4")) {
        this.videoSourcePath = data.path;
        // console.log(this.videoratio);
        this.x = 100;
        this.y = 100;
        this.w = 100;
        this.h = 100;
        // 清空滑块数据
        this.sliderValue = [0, 0];
      } else if (!data.path.endsWith(".mp4")) {
        this.$message("视频格式暂不支持");
      } else {
        this.$message("已经存在视频");
      }
    };
    this.$refs.select_frame.ondragenter = (e) => {
      e.preventDefault(); // 阻止拖入时的浏览器默认行为
      // this.$refs.select_frame.border = "2px dashed red";
    };
    this.$refs.select_frame.ondragover = (e) => {
      e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    };
  },
};
</script>

<style>
.targetTimeRight {
  color: #9c9c9c;
  float: right;
}
.targetTimeLeft {
  color: #9c9c9c;
}
.Class16_9 {
  width: 800px;
  height: 450px;
}
.Class4_3 {
  width: 480px;
  height: 360px;
}
.Class3_4 {
  width: 360px;
  height: 480px;
}
.VideoCutHandle {
  height: 100%;
  position: relative;
}
.handle {
  background: none !important;
  border: 1px solid #fb0000 !important;
  box-shadow: 0 0 0.1px #f00 !important;
  border-radius: 5px;
}
.vdr {
  border: 1px dashed #d47373 !important;
  background: rgba(10, 9, 9, 0.47);
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
.vdrParentClass {
  display: flex;
}
.cutBtnClass {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 强制更改滑块的样式 */
.el-slider__bar {
  background-color: rgba(101, 184, 252, 0.479) !important;
}
.el-slider__button {
  width: 12px !important;
  height: 12px !important;
  border: 2px solid #ff7b00 !important;
  border-radius: 18% !important;
}
</style>
