import React, { useState, useCallback,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginForm, ProFormText, } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import { useRequest } from 'ahooks'
import MD5 from 'crypto-js/md5'

import {style} from './login.css'
import api from '@/api'

const { login } = api.login
export default (props) => {
  const [loginType, setLoginType] = useState('account');
  const history = useHistory();
  const submitForm = useCallback(
    (v) => {
      console.log(v, 'v')
      const p = {...v, password: MD5(v.password).toString()}
      //TODO:调用登录接口
      localStorage.setItem("token", 11112222)
      history.push(`/home`)
      // logon(p)
    },
    [],
  )
  const { run: logon } = useRequest((login), {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (result) => {
      if (result.code === 200) {
        message.success("登录成功")
        localStorage.setItem("token", result.data.access_token)
        history.push(`/home`)

      } else {
        message.error(result.msg)
      }
    }
  })
  return (<div className={style}>
    <LoginForm
    title="宗教治理管理平台"
    style={{margin:'50% 0vh'}}
      onFinish={submitForm}
    >
      <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
        <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
      </Tabs>
      {loginType === 'account' && (<>
        <ProFormText name="userAccount" fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }} placeholder={'用户名'} rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]} />
        <ProFormText.Password name="password" fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }} placeholder={'密码'} rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]} />
      </>)}
    </LoginForm>
  </div>);
};
