<template>
  <div class="img_detail" v-if="Object.keys(imgInfo).length != 0">
    <!-- 图片信息 -->
    <div class="img_info">
      <div class="info_header">
        <img :src="imgInfo.user.avatar" />
        <div class="user_info">
          <div>{{ imgInfo.user.name }}</div>
          <span>{{ imgInfo.newTime }}</span>
        </div>
      </div>
      <div class="info_body">
        <swiper-action @swiperActionEvent="handleSwiperAction">
          <img :src="imgInfo.thumb" mode="widthFix" />
        </swiper-action>
      </div>
      <div class="info_footer">
        <i class="iconfont icon-dianzan">{{ imgInfo.rank }}</i>
        <i class="iconfont icon-shoucang">收藏</i>
      </div>
      <!-- 下载 -->
      <div class="downLoad" @click="handleDownLoad">下载图片</div>
    </div>
  </div>
</template>

<script>
// moment().fromNow();
import moment from "moment";
import SwiperAction from "@/components/SwiperAction.vue";
moment.locale("zh-cn");
export default {
  async onLoad() {
    this.getImgInfo();
    //发送请求
    // this.getCommend(this.imgInfo.id);
  },
  data() {
    return {
      imgInfo: {},
      imgTime: 0
    };
  },
  components: {
    SwiperAction
  },
  methods: {
    getImgInfo(temp = 0) {
      let { List, Index } = getApp().globalData;

      let index = Index - temp;
      if (index < 0 || index > List.length - 1) {
        uni.showToast({
          title: "没数据了",
          icon: "none"
        });
        return;
      }

      this.imgInfo = List[index];
      this.imgInfo.newImg =
        this.imgInfo.thumb + this.imgInfo.rule.replace("$<Height>", 360);

      this.imgInfo.newTime = moment(this.imgInfo.atime * 1000).fromNow();

      getApp().globalData.Index = index;
    },
    getCommend(id) {
      let { res } = this.request(
        `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      );
    },
    handleSwiperAction(e) {
      this.getImgInfo(e);
    },
    async handleDownLoad() {
      let opt = await uni.getSetting();

      if (
        opt[1].authSetting["scope.writePhotosAlbum"] != undefined &&
        opt[1].authSetting["scope.writePhotosAlbum"] == false
      ) {
        // 没权限，就打开权限设置，让用户自己勾选权限
        uni.openSetting();
        return;
      }

      uni.showLoading({
        title: "下载中"
      });
      let res = await uni.downloadFile({
        url: this.imgInfo.img
      });

      res = await uni.saveImageToPhotosAlbum({
        filePath: res[1].tempFilePath
      });

      uni.hideLoading();
      if (res.length > 1) {
        uni.showToast({
          title: "下载成功"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//头部
.info_header {
  padding: 20upx;
  display: flex;
  img {
    display: inline-block;
    width: 90upx;
    height: 90upx;
    border-radius: 50%;
  }
  .user_info {
    margin-left: 20upx;
    display: flex;
    flex-direction: column;

    justify-content: center;

    div {
      font-weight: bold;
    }
    span {
      color: #aaa;
      font-size: 24upx;
    }
  }
}
.info_footer {
  display: flex;
  justify-content: space-around;
  line-height: 90upx;
  border-bottom: 2upx solid #ddd;
}

// 下载图片
.downLoad {
  position: fixed;
  bottom: 0;

  width: 100%;
  background-color: #f55;
  color: #fff;
  font-size: 36upx;
  text-align: center;
  line-height: 90upx;
}
</style>
