<template>
  <div class="video">
    <!-- 分段器 -->
    <div class="video_tab_control">
      <uni-segmented-control
        :current="current"
        :values="items"
        @clickItem="onClickItem"
        style-type="text"
        active-color="#f55"
      ></uni-segmented-control>
    </div>
    <div v-if="current<4">
      <video-main :current="current"></video-main>
    </div>
    <div v-else-if="current==4">
      <video-cate></video-cate>
    </div>
  </div>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import VideoMain from "./VideoMain.vue";
import VideoCate from "./VideoCate.vue";
export default {
  onLoad() {
    console.log(2);
  },
  data() {
    return {
      items: ["推荐", "娱乐", "最新", "热门", "分类"],
      current: 0,
      hasData: true,
      params: {
        limit: 30,
        skip: 0,
        order: "hot"
      },
      id: 0,
      videoList: []
    };
  },
  methods: {
    //切换 tabbar
    onClickItem(e) {
      this.current !== e.currentIndex && (this.current = e.currentIndex);
    }
  },
  components: {
    uniSegmentedControl,
    VideoCate,
    VideoMain
  }
};
</script>

<style lang='scss' scoped>
.cate_tab_control {
  width: 40%;
  margin: 0 auto;
}
</style>
