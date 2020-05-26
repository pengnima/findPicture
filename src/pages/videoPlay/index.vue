<template>
  <div class="video_play">
    <div class="bg_img">
      <img :src="videoObj.img" mode="aspectFill" />
    </div>
    <!-- 工具栏 -->
    <div class="video_tools">
      <i class="iconfont icon-shengyin"></i>
      <i class="iconfont icon-zhuanfa"></i>
    </div>
    <!-- 主体 -->
    <div class="video">
      <video :src="videoObj.video" object-fit="fill"></video>
    </div>

    <!-- 下载 -->
    <div class="dwonload">下载高清</div>
  </div>
</template>

<script>
export default {
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  data() {
    return {
      videoObj: {}
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.video_play {
  position: relative;
}
.bg_img {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  img {
    height: 100%;
    filter: blur(12px);
  }
}

.video_tools {
  display: flex;

  justify-content: flex-end;
  i {
    width: 90upx;
    height: 90upx;

    background-color: rgba(170, 170, 170, 0.5);
    border-radius: 50%;

    color: #fff;
    font-size: 48upx;
    line-height: 90upx;
    text-align: center;

    margin-right: 10upx;
  }
}

.video {
  display: flex;
  justify-content: center;
  video {
    width: 360upx;
    height: 600upx;
  }
}

.dwonload {
  background-color: rgba(170, 170, 170, 0.5);

  width: 400upx;
  line-height: 80upx;
  text-align: center;
  color: #fff;

  margin: 40upx auto;

  font-size: 48upx;
  border-radius: 40upx;
  border: 2upx solid #fff;
}
</style>