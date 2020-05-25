<template>
  <div class="img_detail" v-if="Object.keys(imgInfo).length != 0">
    <div class="info_header">
      <img :src="imgInfo.user.avatar" />
      <span>{{ imgInfo.user.name }}</span>
      <span>{{ imgInfo.atime }}</span>
    </div>
    <div class="info_body">
      <img :src="imgInfo.newImg" />
    </div>
    <div class="info_footer">
      <i class="iconfont icon-dianzan">{{ imgInfo.rank }}</i>
      <i class="iconfont icon-shoucang">收藏</i>
    </div>
  </div>
</template>

<script>
// moment("20111031", "YYYYMMDD").fromNow();
import moment from "moment";
export default {
  onLoad() {
    let { List, Index } = getApp().globalData;

    this.imgInfo = List[Index];
    this.imgInfo.newImg =
      this.imgInfo.thumb + this.imgInfo.rule.replace("$<Height>", 360);

    console.log(this.imgInfo);
  },
  data() {
    return {
      imgInfo: {},
      imgTime: 0,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.info_header {
  img {
    display: inline-block;
    width: 90upx;
    height: 90upx;
    border-radius: 50%;
  }
}
</style>
