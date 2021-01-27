<template>
  <div class="cutVideo16_9">
    <video
      :src="videoSrc"
      class="videoCutVideoClass"
      autoplay="autoplay"
      muted="muted"
      loop="loop"
      width="800px"
      height="450px"
      @dblclick="cancelsrc"
    ></video>
    <div class="videoCutVideoClass firstTextClass">
      <div class="dragTipClass">请将视频拖放到此处</div>
    </div>
    <vdr
      :parent="true"
      :x="x"
      :y="y"
      :w="w"
      :h="h"
      @dragging="onDrag"
      @resizing="onResize"
    >
    </vdr>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    cancelsrc() {
      this.videoSrc = "";
    },
  },
};
</script>

<style>
.cutVideo16_9 {
  width: 800px;
  height: 450px;
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
</style>
