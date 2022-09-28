/*
 * @Description: 
 * @Autor: 王敏
 * @LastEditTime: 2021-12-16 17:20:05
 */
import styles from './index.less';
import  { useCallback, } from 'react';
import { useModel } from 'umi';

import {qiankun} from '@/app'

export default function IndexPage() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const getMenuData=useCallback(()=>{
    console.log('subMenu:', masterProps?.globalState('subMenu'))
    console.log('token:', masterProps?.globalState('token'))
  },[])
  const getMenuData2=useCallback(()=>{
    console.log('subMenu:', qiankun.globalProps().globalState('subMenu'))
    console.log('token:', qiankun.globalProps().globalState('token'))
  },[])
  return (
    <div>
      <h1 className={styles.title}>我是react的umi子应用</h1>
      {window.__POWERED_BY_QIANKUN__ ? 
      (<>
        <div onClick={()=>masterProps?.globalFun('backMain')}>返回主应用</div>
        <div onClick={()=>masterProps?.globalFun('logout')}>退出登录</div>
        <h3 onClick={()=>getMenuData()}>通过useModel从获取父组件传过来的数据（控制台可打印）</h3>
        <h3 onClick={()=>getMenuData2()}>通过引入js从获取父组件传过来的数据（控制台可打印）</h3>
      </>) 
      : null}
      
    </div>
  );
}
