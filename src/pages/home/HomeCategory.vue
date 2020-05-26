<template>
  <div class="home_cate">
    <div class="cate_wrap">
      <navigator
        :url="`/pages/imgCategory/index?id=${item.id}`"
        class="cate_item"
        v-for="item in cateList"
        :key="item.id"
      >
        <img :src="item.cover" mode="aspectFill" />
        <div>{{item.name}}</div>
      </navigator>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getCateList();
  },
  data() {
    return {
      cateList: []
    };
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.request("vertical/category");
      res = res.res;

      this.cateList = res.category;
      //
      console.log(this.cateList);
    }
  }
};
</script>

<style lang="scss" scoped>
.cate_wrap {
  display: flex;
  flex-wrap: wrap;
}
.cate_item {
  width: 33.33%;
  position: relative;
  border: 4upx solid #fff;

  img {
    height: 240upx;
  }

  div {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 20upx;
    color: #fff;
    font-size: 36upx;

    background-image: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
}
</style>
