/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2022-09-28 19:38:46
 */
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

//路由base Map
let routerbase = {
  development: {
    qiankun: '/subapp2',
    local: '/'
  },
  production: {
    qiankun: '/mainApp/subapp2',
    local: '/subReact'
  },
}
window.routerBase = routerbase[process.env.NODE_ENV][location.href.includes("subapp") ? 'qiankun' : 'local'];
let globalProps = {}
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props, window.routerBase);
    if (window.__POWERED_BY_QIANKUN__) {
      globalProps = props
      localStorage.setItem("token", props.globalState('token'))
    }
  },
  globalProps: () => globalProps,
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};


export function patchRoutes({ routes }) {
  if (window.__POWERED_BY_QIANKUN__) {//乾坤环境
    routes.shift()
    routes.push({
      path: '*',
      redirect: '/home',
    })
  } else {
    routes.push({
      path: '/',
      redirect: '/login',
    })
  }
}

