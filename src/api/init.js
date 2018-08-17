import ElementUI from 'element-ui';
import Axios from 'axios';
import Config from '../config';

function buildApiUrl(url) {
  return `${Config.apiUrl}/${url}`;
}

function setToken() {
  Axios.defaults.headers['token'] = sessionStorage.getItem(Config.tokenKey);
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function buildServerApiRequest(params, url, type, callback) {
  Axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
  Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
  Axios.defaults.crossDomain = true;
  Axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
  setToken();
  if ('get' == type) {
	  params={params:params}
    //做一些加载的小动画挺好
  }
  let apiUrl = buildApiUrl(url);
  let result = Axios[type](apiUrl, params);

  if (isFunction(callback)) {//没有回调则返回es6 promise
    result.then(r => {
		r = r.data;
      //这里可以根据后台数据进一步做一些过滤或者报错之类的
        if(r.code == '401') {
            ElementUI.Notification.error({
                title: '登录异常',
                message: '请重新登录!'
            });
            sessionStorage.removeItem(Config.tokenKey);
            // this.$router.push({path: '/login'});
        } else {
            callback(r);
        }
    }).catch(e => {
      if(__DEV__)
        console.log(e);
      ElementUI.Notification.error({
        title: '请求错误',
        message: '网络异常!'
      });
    });
  }
  return result;
}


export function buildApiRequest(params, url, type, callback) {
  return buildServerApiRequest(params, url, type, callback);
}

export function getApiUrl(url) {
  //只是返回api地址而不做请求，用在上传组件之类的
  return buildApiUrl(url) + '?token=' + sessionStorage.getItem(Config.tokenKey);
}

