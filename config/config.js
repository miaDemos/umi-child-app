/*
 * @Description:全局配置文件
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-09-13 15:23:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-28 19:34:30
 */
import routes from './routes';

export default {
  routes, // 配置式路由
  title: '民宗项目',
  // publicPath: process.env.NODE_ENV === 'development' ? '/':'/minzong/manageSystem/',// 资源存放路径
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/subReact/',// 资源存放路径
  proxy: {
    '/api': {
      'target': 'http://101.132.194.174:7830/national',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  fastRefresh: {},
};
