<template>
  <div class="video_main">
    <scroll-view
      scroll-y
      enable-flex
      class="video_main_wrap"
      @scrolltolower="handleScrollToLower"
      @click.native="handleGoVideo"
    >
      <div class="main_item" v-for="item in cateList" :key="item._id">
        <img :src="item.img" mode="widthFix" :data-item="item" />
      </div>
    </scroll-view>
  </div>
</template>

<script>
// 推荐 http://157.122.54.189:9088/videoimg/v1/videowp/featured    hot
// 娱乐 http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a   new
// 最新 http://157.122.54.189:9088/videoimg/v1/videowp/videowp     new
// 热门 http://157.122.54.189:9088/videoimg/v1/videowp/videowp     hot

export default {
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  created() {
    let map = new Map([
      [0, { url: "featured", order: "hot" }],
      [1, { url: "category/59b25abbe7bce76bc834198a", order: "new" }],
      [2, { url: "videowp", order: "new" }],
      [3, { url: "videowp", order: "hot" }]
    ]);
    this.map = map;
    this.obj = this.map.get(this.current);

    this.getList();
  },
  watch: {
    current(val) {
      this.obj = this.map.get(val);
      this.params.skip = 0;
      this.cateList = [];
      this.hasData = true;
      this.getList();
    }
  },
  data() {
    return {
      VIDEO_URL: "http://157.122.54.189:9088/videoimg/v1/videowp/",
      params: {
        limit: 30,
        skip: 0,
        order: ""
      },
      cateList: [],
      map: null,
      obj: null,
      hasData: true
    };
  },
  methods: {
    async getList() {
      let { data: res } = await this.request(
        `${this.VIDEO_URL}${this.obj.url}`,
        {
          data: {
            ...this.params,
            order: this.obj.order
          }
        }
      );
      res = res.res;

      if (res.videowp.length == 0) {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
        this.hasData = false;
        return;
      }
      this.cateList = [...this.cateList, ...res.videowp];

      console.log(this.cateList);
    },
    handleScrollToLower() {
      if (this.hasData) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    },
    handleGoVideo(e) {
      getApp().globalData.video = e.target.dataset.item;

      uni.navigateTo({
        url: "/pages/videoPlay/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video_main_wrap {
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: wrap;
  .main_item {
    width: 33.33%;
    border: 4upx solid #fff;
  }
}
</style>