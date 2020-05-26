<template>
  <div class="img_category">
    <!-- 分段器 -->
    <div class="cate_tab_control">
      <uni-segmented-control
        :current="current"
        :values="items"
        @clickItem="onClickItem"
        style-type="text"
        active-color="#f55"
      ></uni-segmented-control>
    </div>

    <!-- 内容 -->
    <scroll-view enable-flex class="cate_wrap" scroll-y @scrolltolower="handleScrollLower">
      <div class="cate_item" v-for="item in cateList" :key="item.id">
        <img :src="item.thumb" mode="widthFix" />
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  data() {
    return {
      items: ["最新", "热门"],
      current: 1,
      hasData: true,
      params: {
        limit: 30,
        skip: 0,
        order: "hot"
      },
      id: 0,
      cateList: []
    };
  },
  components: {
    uniSegmentedControl
  },
  watch: {
    current(val) {
      this.hasData = true;
      this.params.skip = 0;
      this.params.order = val == 1 ? "hot" : "new";
      this.cateList = [];

      this.getList();
    }
  },
  methods: {
    //切换 tabbar
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    // 获取 list
    async getList() {
      let { data: res } = await this.request(
        `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        {
          data: this.params
        }
      );
      res = res.res;

      if (res.vertical.length == 0 && this.params.skip != 0) {
        this.hasData = false;
        uni.showToast({
          title: "刷到底了！！",
          icon: "none"
        });
        return;
      }

      this.cateList = [...this.cateList, ...res.vertical];
    },
    handleScrollLower(e) {
      if (this.hasData) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "刷到底了！！",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.cate_tab_control {
  width: 40%;
  margin: 0 auto;
}

.cate_wrap {
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: wrap;
  .cate_item {
    width: 33%;
    border: 4upx solid #fff;
  }
}
</style>