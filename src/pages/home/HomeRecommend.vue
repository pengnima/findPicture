<template>
  <scroll-view
    scroll-y
    class="home_recommend"
    @scrolltolower="handleToLower"
    v-if="Object.keys(monthes).length != 0"
  >
    <!-- 推荐 -->
    <div class="recommend_wrap">
      <navigator
        class="recommend_item img_wrap"
        v-for="item in recommends"
        :key="item.id"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <img :src="item.thumb" mode="widthFix" />
      </navigator>
    </div>
    <!-- 月份 -->
    <div class="monthes_wrap">
      <div class="monthes_date">
        {{ monthes.DD }} /
        <span style="font-size:26upx">{{ monthes.MM }} 月</span>
      </div>
      <div class="monthes_msg">{{ monthes.title }}</div>
      <div class="home_more">更多</div>
    </div>

    <div class="content_wrap" @click="handleGlobalEvent(monthes.items, $event)">
      <navigator
        :url="'/pages/imgDetail/index'"
        class="content_item img_wrap"
        v-for="(item, index) in monthes.items"
        :key="item.id"
      >
        <img
          :data-index="index"
          :src="item.thumb + item.rule.replace('$<Height>', 360)"
          mode="aspectFill"
        />
      </navigator>
    </div>

    <!-- 热门 -->
    <div class="hots_wrap">
      <div class="hots_title">
        <span>热门</span>
      </div>
      <div class="hots_content" @click="handleGlobalEvent(hots, $event)">
        <navigator
          :url="'/pages/imgDetail/index'"
          class="hot_item img_wrap"
          v-for="(item, index) in hots"
          :key="item.id"
        >
          <img :data-index="index" :src="item.thumb" mode="widthFix" />
        </navigator>
      </div>
    </div>
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  created() {
    this.getList();
  },
  components: {},
  data() {
    return {
      //请求信息
      requestInfo: {
        //获取条数
        limit: 30,
        //关键字
        order: "hot",
        //跳过的条数
        skip: 0
      },
      recommends: [],
      monthes: {},
      hots: [],
      hasData: true
    };
  },
  methods: {
    async getList() {
      let { data: res } = await this.request(
        "http://157.122.54.189:9088/image/v3/homepage/vertical",
        {
          data: this.requestInfo
        }
      );
      res = res.res;

      if (res.vertical.length == 0) {
        this.hasData = false;
        return;
      }

      if (this.recommends.length == 0) {
        //推荐
        this.recommends = res.homepage[1].items;
        //日期
        this.monthes = res.homepage[2];
        this.monthes.DD = moment(this.monthes.stime).format("DD");
        this.monthes.MM = moment(this.monthes.stime).format("MM");
      }

      //热门
      this.hots = [...this.hots, ...res.vertical];
    },
    handleToLower() {
      if (this.hasData) {
        this.requestInfo.skip += this.requestInfo.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "刷到底了！！",
          icon: "none"
        });
      }
    },
    handleClick(item, e) {
      getApp().globalData.List = item;
      getApp().globalData.Index = e.target.dataset.index;
    }
  }
};
</script>

<style lang="scss" scoped>
.home_recommend {
  height: calc(100vh - 36px);
}
.img_wrap {
  width: 33.33%;
  float: left;
  border: 4upx solid #fff;
}
// 推荐
.recommend_wrap {
  overflow: hidden;
  .recommend_item {
    width: 50%;
  }
}

// 月份
.monthes_wrap {
  display: flex;
  padding: 0 20upx;
  font-size: 32upx;
  font-weight: bolder;
  .monthes_date {
    color: $color;
    margin-right: 20upx;
  }

  .monthes_msg {
    flex: 1;
    color: #666;
  }
  .home_more {
    color: $color;
    font-weight: normal;

    &::after {
      font-family: "iconfont";
      content: "\e62a";
    }
  }
}
.content_wrap {
  overflow: hidden;
}
// 热门
.hots_title {
  padding: 0 10upx;

  span {
    padding-left: 20upx;
    font-size: 32upx;
    font-weight: bolder;
    color: #666;
    border-left: 20upx solid $color;
  }
}

.hots_content {
  overflow: auto;
}
</style>
