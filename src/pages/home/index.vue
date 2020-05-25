<template>
  <div class="home_tab">
    <div class="home_tab_title">
      <div class="home_tab_control">
        <uni-segmented-control
          :values="tabs"
          :current="current"
          @clickItem="handleTabClick"
          style-type="text"
          active-color="#f55"
        ></uni-segmented-control>
      </div>
      <div class="iconfont icon-search"></div>
    </div>
    <div class="home_tab_content">
      <div v-if="current === 0">
        <home-recommend></home-recommend>
      </div>
      <div v-if="current === 1">
        <home-category></home-category>
      </div>
      <div v-if="current === 2">
        <home-new></home-new>
      </div>
      <div v-if="current === 3">
        <home-album></home-album>
      </div>
    </div>
  </div>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import HomeAlbum from "./HomeAlbum.vue";
import HomeCategory from "./HomeCategory.vue";
import HomeNew from "./HomeNew.vue";
import HomeRecommend from "./HomeRecommend.vue";

export default {
  data() {
    return {
      tabs: ["推荐", "分类", "最新", "专辑"],
      current: 0,
    };
  },
  onLoad() {},
  methods: {
    handleTabClick(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      //切换navbar的文字
      uni.setNavigationBarTitle({
        title: this.tabs[this.current],
      });
    },
  },
  components: {
    uniSegmentedControl,

    HomeAlbum,
    HomeCategory,
    HomeNew,
    HomeRecommend,
  },
};
</script>

<style lang="scss" scoped>
.home_tab_title {
  position: relative;

  .home_tab_control {
    width: 60%;
    margin: 0 auto;
  }
  .icon-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40upx;
  }
}
</style>
