<template>
  <div class="home_cate">
    <div class="cate_wrap">
      <div class="cate_item" v-for="item in cateList" :key="item.id">
        <img :src="item.cover" />
        <span>{{item.name}}</span>
      </div>
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
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-between;
}
.cate_item {
  width: 240upx;
  height: 240upx;
  position: relative;

  border-bottom: 8upx solid #fff;

  img {
    height: 100%;
  }

  span {
    position: absolute;
    left: 20upx;
    bottom: 0;
    color: #fff;
    font-size: 36upx;
  }
}
</style>
