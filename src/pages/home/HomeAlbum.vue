<template>
  <div class="home_album">
    <scroll-view class="album_scroll" scroll-y @scrolltolower="handleToLower">
      <swiper
        class="album_swiper"
        indicator-dots
        indicator-active-color="#f55"
        circular
        interval="3000"
        autoplay
      >
        <swiper-item v-for="item in banner" :key="item.id">
          <img :src="item.thumb" mode="widthFix" />
        </swiper-item>
      </swiper>

      <div class="album_item" v-for="item in albums" :key="item.id">
        <div class="item_left">
          <img :src="item.cover" mode="acpectFill" />
        </div>
        <div class="item_right">
          <div class="item_name">{{ item.name }}</div>
          <div class="item_title">{{ item.desc }}</div>
          <uni-tag
            class="unitag"
            text="+ 关注"
            inverted
            type="error"
            size="small"
          ></uni-tag>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { uniTag } from "@dcloudio/uni-ui";
export default {
  created() {
    this.getList();
  },
  components: {
    uniTag,
  },
  data() {
    return {
      //请求信息
      requestInfo: {
        //获取条数
        limit: 30,
        //关键字
        order: "new",
        //跳过的条数
        skip: 0,
      },

      //轮播图
      banner: [],
      //专辑
      albums: [],
      hasData: true,
    };
  },
  methods: {
    async getList() {
      let { data: res } = await this.request("wallpaper/album", {
        data: this.requestInfo,
      });
      res = res.res;
      if (res.album.length == 0) {
        this.hasData = false;
        return;
      }
      if (this.banner.length == 0) {
        this.banner = res.banner;
      }
      this.albums = [...this.albums, ...res.album];
    },
    handleToLower() {
      if (this.hasData) {
        this.requestInfo.skip += this.requestInfo.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "刷到底了！！",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 轮播图
.album_swiper {
  height: 332upx;
  overflow: hidden;
}

.album_scroll {
  height: calc(100vh - 32px);
}

// 内容
.album_item {
  display: flex;

  margin-bottom: 6upx;
  padding: 10upx;
  border-bottom: 2upx solid #ddd;
}
.item_left {
  flex: 1;
  width: 200upx;
  height: 200upx;

  img {
    height: 100%;
  }
}
.item_right {
  position: relative;

  flex: 2;
  padding: 0 10upx;
  overflow: hidden;

  .item_name {
    font-size: 32upx;
    font-weight: bold;
    margin-left: 20upx;
    margin-bottom: 10upx;
  }
  .item_title {
    font-size: 26upx;
    color: #666;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .unitag {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
