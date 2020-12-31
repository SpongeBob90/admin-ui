import axios from "axios";
import qs from "qs";

var instance = axios.create({});

instance.interceptors.request.use(function (config) {
  // 判断请求方法是GET,对GET请求参数进行序列化
  if(config.method === 'get'){
    config.params = qs.parse(config.params);
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config;
}, function (err) {
  return Promise.reject(err);
});


instance.interceptors.response.use(function (res) {
  return res;
}, function (err) {
  return err;
});

export default instance;
