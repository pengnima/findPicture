<template>
  <div @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startTime: 0
    };
  },
  methods: {
    handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
      this.startTime = e.timeStamp;
    },
    handleTouchEnd(e) {
      const endX = e.changedTouches[0].clientX;
      const endTime = e.timeStamp;

      //超过2秒，退出
      if (endTime - this.startTime > 2000) {
        return;
      }
      //有效
      if (Math.abs(endX - this.startX) > 10) {
        if (endX > this.startX) {
          //index要 -1
          this.$emit("swiperActionEvent", "1");
        } else {
          //index - -1 === index + 1
          //外面的 index是数字， 数字 - 字符串 = 数字
          this.$emit("swiperActionEvent", "-1");
        }
      }
    }
  }
};
</script>

<style>
</style>