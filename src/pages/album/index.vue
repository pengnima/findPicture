<template>
  <div class="album_detail" v-if="Object.keys(album).length != 0">
    <!-- 大图和评论 -->
    <div class="album_content">
      <div class="album_image">
        <img :src="album.lcover" />
      </div>
      <div class="album_commend">
        <div class="user">
          <img :src="album.user.avatar" mode="widthFix" />
          <span>{{ album.user.name }}</span>
        </div>
        <div class="desc">
          {{ album.desc }}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="wallpaper" @click="handleGlobalEvent(wallpaper, $event)">
      <navigator
        :url="'/pages/imgDetail/index'"
        class="wall_item"
        v-for="(item, index) in wallpaper"
        :key="item.id"
      >
        <img
          :data-index="index"
          :src="item.thumb + item.rule.replace('$<Height>', 360)"
          mode="widthFix"
        />
      </navigator>
    </div>
  </div>
</template>

<script>
/**
  limit	number	获取多少条数据
  order	string	关键字 “new”
  skip	number	跳过多少条
  first	number	“1” 表示第一次请求 “0”表示不是第一次请求
 */
export default {
  onLoad(options) {
    this.id = options.id;

    this.getAlbumList();
  },
  data() {
    return {
      id: null,
      queryInfo: {
        limit: 30,
        order: "new",
        skip: 0,
        //1表示第一次请求数据，返回值中有album
        first: 1,
      },

      // 专辑
      album: {},
      //照片
      wallpaper: [],
      hasData: true,
    };
  },
  methods: {
    async getAlbumList() {
      let { data: res } = await this.request(
        `wallpaper/album/${this.id}/wallpaper`,
        {
          data: this.queryInfo,
        }
      );
      res = res.res;

      if (Object.keys(this.album).length == 0) {
        this.album = res.album;
      }

      if (res.wallpaper.length == 0) {
        this.hasData = false;
        return;
      }

      this.wallpaper = [...this.wallpaper, ...res.wallpaper];
    },

    onReachBottom() {
      if (this.hasData) {
        this.queryInfo.skip += this.queryInfo.limit;
        this.queryInfo.first = 0;
        this.getAlbumList();
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
.album_commend {
  padding: 10upx;
}
.user {
  display: flex;
  img {
    width: 90upx;
    height: 90upx;

    border-radius: 50%;
    margin-right: 10upx;
  }
  span {
    line-height: 90upx;
  }
}

.desc {
  color: #888;
  white-space: pre-line;
}

.wallpaper {
  display: flex;
  flex-wrap: wrap;
}
.wall_item {
  width: 33.33%;
  border: 2upx solid #fff;
}
</style>
