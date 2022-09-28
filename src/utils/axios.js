/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-16 16:19:17
 */
/* eslint-disable eqeqeq */
import axios from 'axios';
import { BASEURL, BASEURL2 } from './config.js';
import { message as Message } from 'antd';
import qs from 'qs';
import { history } from 'umi';
import {qiankun} from '@/app'

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    // 判断是否存在Authorization，如果存在的话，则每个http header都加上Authorization
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * @description:
 * @param 必传：url(接口地址)、method(方法)
 * @param 非必传： data(请求参数)、useFormData(是否是formdata传参)、checkCode(是否需要校验回执参数是否为200)、type(2是访问其他的服务器)
 * 接口前缀：@/assets/js/config.js 里的BASEURL
 * @author: 王敏
 */
export const myAxios = (options = {}) => {
  const {
    url,
    method,
    data = {},
    type = 1,
    useFormData = false,
    checkCode = true,
  } = options;

  if (!url) return Promise.reject(new Error('url is required'));
  const base = {
    1: BASEURL,
    2: BASEURL2,
  };
  let request = {
    method,
    url: base[type] + url,
    [method === 'get' ? 'params' : 'data']: data,
  };

  if (useFormData) {
    request = {
      ...request,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'enctype':'multipart/form-data'
      },
      data: qs.stringify(request.data),
    };
  }
  return axios(request)
    .then((response) => {
      if (!checkCode) response.data = { code: 200, ...response.data };
      if (response.data.code === 200) {
        return response.data;
      }
      if (response.data.code === 401) {
        if(window.__POWERED_BY_QIANKUN__){
          qiankun.globalProps().globalFun("logout")
        }else{
          localStorage.clear();
          history.push('/login');
        }
      }
      const { msg, message } = response.data;
      // const error = new Error(msg || message)
      // error.isApiCodeError = true
      // throw error
      Message.error(msg || message);
      return response.data;
    })
    .catch((err) => {
      console.log(err.isApiCodeError, err);
      Message.error(err.isApiCodeError ? err : '获取信息失败');
      return Promise.reject(err);
    });
};
