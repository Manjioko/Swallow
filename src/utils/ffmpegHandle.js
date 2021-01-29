import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";
import { remote } from "electron";
const { spawn, exec } = window.require("child_process");

let ffmpegPath = ffmpegStatic.path;
let ffprobePath = ffprobeStatic.path;

// 设置 fluent-ffmpeg 的 ffmpeg 、ffprobe路径
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
// let that = this;
class ffmpegHandleClass {
  constructor() {

  }
  // 点击剪切视频后触发该函数
  cutVideo(videoPath, cutArr, timeArr, videoName, savePath) {
    let cut = "crop=" + cutArr.join(":");
    // let cut = 'crop=80:60:200:100'
    let ff = spawn(ffmpegStatic, [
      "-y",
      "-ss",
      timeArr[0],
      "-i",
      videoPath,
      "-t",
      timeArr[1] - timeArr[0],
      "-filter:v",
      cut,
      "-c:a",
      "copy",
      savePath + "/" + new Date().getTime() + "_" + videoName,
    ]);

    ff.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ff.stderr.on("data", (data) => {

      console.error(`stderr: ${data}`);
    });

    ff.on("close", (code) => {
      console.log(`子进程退出，退出码 ${code}`);
    });
  }
}

export default ffmpegHandleClass;