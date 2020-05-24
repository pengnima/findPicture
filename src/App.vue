<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import url(./style/iconfont.css);
page,
view,
navigator,
text,
swiper,
swiper-item,
img {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* 
  定义全局变量，例如：
    主题颜色，统一字体大小
 */
page {
  --themColor: #eb4450;
  font-size: 28rpx;
}

img {
  width: 100%;
  display: block;
}
</style>
