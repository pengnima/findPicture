<template>
  <div class="home_recommend">
    <div class="recommend_wrap">
      <div class="recommend_item" v-for="item in recommends" :key="item.id">
        <image :src="item.thumb" mode="widthFix"></image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    let { data: res } = await this.request({
      data: this.requestInfo,
    });
    res = res.res;
    // console.log(res);
    this.recommends = res.homepage[1].items;
    console.log(this.recommends);
  },
  data() {
    return {
      //请求信息
      requestInfo: {
        //获取条数
        limit: 30,
        //关键字
        order: "hot",
        //跳过的条数
        skip: 0,
      },
      recommends: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.recommend_wrap {
  overflow: hidden;
  .recommend_item {
    width: 50%;
    float: left;
    border: 4upx solid #fff;
  }
}
</style>
