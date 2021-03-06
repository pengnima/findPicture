import Vue from "vue";
import App from "./App";
import request from "./utils/request.js";

//接口文档： https://www.showdoc.cc/414855720281749?page_id=3678621017219602
Vue.config.productionTip = false;
Vue.prototype.request = request;

Vue.prototype.handleGlobalEvent = function(item, e) {
  getApp().globalData.List = item;
  getApp().globalData.Index = e.target.dataset.index;
};

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
