const BASE_URL = "http://157.122.54.189:9088/image/v3/homepage/vertical";

export default (params, url = "") => {
  //加載中
  uni.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
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
