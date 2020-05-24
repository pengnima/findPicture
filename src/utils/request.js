const BASE_URL = "http://157.122.54.189:9088/image/v1/";
// http://157.122.54.189:9088/image/v1/wallpaper/album

export default (url, params) => {
  if (url.substr(0, 4) != "http") {
    url = BASE_URL + url;
  }
  //加載中
  uni.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      ...params,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        // console.log();
        uni.hideLoading();
      },
    });
  });
};
